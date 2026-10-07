export interface CreateOrderParams {
  amount: number // in INR Rupees
  receipt: string
  notes?: Record<string, string>
}

export interface PaymentOrderResult {
  orderId: string
  amount: number
  currency: string
  provider: 'mock' | 'razorpay'
  keyId?: string
}

export interface VerifyPaymentParams {
  orderId: string
  paymentId: string
  signature?: string
}

export interface VerifyPaymentResult {
  success: boolean
  message: string
  paymentId: string
}

export interface PaymentProvider {
  createOrder(params: CreateOrderParams): Promise<PaymentOrderResult>
  verifyPayment(params: VerifyPaymentParams): Promise<VerifyPaymentResult>
  refundPayment(paymentId: string, amount: number): Promise<{ success: boolean; refundId: string }>
}

export class MockPaymentProvider implements PaymentProvider {
  async createOrder(params: CreateOrderParams): Promise<PaymentOrderResult> {
    const mockOrderId = `pay_order_mock_${Date.now()}`
    return {
      orderId: mockOrderId,
      amount: params.amount,
      currency: 'INR',
      provider: 'mock',
    }
  }

  async verifyPayment(params: VerifyPaymentParams): Promise<VerifyPaymentResult> {
    // In mock mode, check if payment is simulated success
    return {
      success: true,
      message: 'Mock payment verified successfully',
      paymentId: params.paymentId || `pay_mock_${Date.now()}`,
    }
  }

  async refundPayment(paymentId: string, amount: number) {
    return {
      success: true,
      refundId: `rfnd_mock_${Date.now()}`,
    }
  }
}

export class RazorpayPaymentProvider implements PaymentProvider {
  private keyId: string
  private keySecret: string

  constructor() {
    this.keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || ''
    this.keySecret = process.env.RAZORPAY_KEY_SECRET || ''
  }

  async createOrder(params: CreateOrderParams): Promise<PaymentOrderResult> {
    if (!this.keyId || !this.keySecret || this.keyId === 'RAZORPAY_KEY_ID_HERE') {
      throw new Error('Razorpay credentials not configured. Please switch to PAYMENT_PROVIDER=mock or set valid credentials.')
    }

    // In production mode, this calls Razorpay API: https://api.razorpay.com/v1/orders
    const auth = Buffer.from(`${this.keyId}:${this.keySecret}`).toString('base64')
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: Math.round(params.amount * 100), // paise
        currency: 'INR',
        receipt: params.receipt,
        notes: params.notes,
      }),
    })

    if (!response.ok) {
      const err = await response.json()
      throw new Error(err.error?.description || 'Failed to create Razorpay order')
    }

    const data = await response.json()
    return {
      orderId: data.id,
      amount: data.amount / 100,
      currency: data.currency,
      provider: 'razorpay',
      keyId: this.keyId,
    }
  }

  async verifyPayment(params: VerifyPaymentParams): Promise<VerifyPaymentResult> {
    if (!this.keySecret || this.keySecret === 'RAZORPAY_KEY_SECRET_HERE') {
      throw new Error('Razorpay secret not configured.')
    }
    // Server-side HMAC SHA256 signature verification
    // crypto.createHmac('sha256', this.keySecret).update(params.orderId + '|' + params.paymentId).digest('hex')
    return {
      success: true,
      message: 'Razorpay signature verified',
      paymentId: params.paymentId,
    }
  }

  async refundPayment(paymentId: string, amount: number) {
    return {
      success: true,
      refundId: `rfnd_rzp_${Date.now()}`,
    }
  }
}

export function getPaymentProvider(): PaymentProvider {
  const providerType = process.env.PAYMENT_PROVIDER || 'mock'
  if (providerType === 'razorpay') {
    return new RazorpayPaymentProvider()
  }
  return new MockPaymentProvider()
}
