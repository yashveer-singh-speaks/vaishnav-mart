import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    const { orderId, paymentId, signature } = await request.json()

    const keySecret = process.env.RAZORPAY_KEY_SECRET || ''

    if (!keySecret) {
      return NextResponse.json(
        { success: false, message: 'Razorpay secret missing on server' },
        { status: 500 }
      )
    }

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { success: false, message: 'Missing orderId, paymentId, or signature' },
        { status: 400 }
      )
    }

    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex')

    const generatedBuf = Buffer.from(generatedSignature, 'utf8')
    const receivedBuf = Buffer.from(signature, 'utf8')

    if (generatedBuf.length !== receivedBuf.length || !crypto.timingSafeEqual(generatedBuf, receivedBuf)) {
      return NextResponse.json(
        { success: false, message: 'Invalid payment signature' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      paymentId,
      orderId,
    })
  } catch (err: any) {
    console.error('Razorpay verification error:', err)
    return NextResponse.json(
      { success: false, message: err?.message || 'Server error during payment verification' },
      { status: 500 }
    )
  }
}
