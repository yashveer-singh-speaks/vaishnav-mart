import { NextResponse } from 'next/server'
import crypto from 'crypto'
import Razorpay from 'razorpay'

export async function POST(request: Request) {
  try {
    const { amount, receipt, notes } = await request.json()

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || ''
    const keySecret = process.env.RAZORPAY_KEY_SECRET || ''

    if (!keyId || !keySecret || keyId === 'mock_razorpay_key') {
      return NextResponse.json(
        { error: 'Razorpay keys not configured on server' },
        { status: 500 }
      )
    }

    const instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    })

    const options = {
      amount: Math.round(Number(amount) * 100), // paise
      currency: 'INR',
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: notes || {},
    }

    const order = await instance.orders.create(options)

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    })
  } catch (err: any) {
    console.error('Razorpay order creation error:', err)
    return NextResponse.json(
      { error: err?.error?.description || err?.message || 'Failed to create Razorpay order' },
      { status: 500 }
    )
  }
}
