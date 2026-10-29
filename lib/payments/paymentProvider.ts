export interface CreateOrderParams {
  amount: number // in INR Rupees
  receipt: string
  notes?: Record<string, string>
}

export interface PaymentOrderResult {
  orderId: string
  amount: number
  amountPaise?: number
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
      amountPaise: Math.round(params.amount * 100),
      currency: 'INR',
      provider: 'mock',
    }
  }

  async verifyPayment(params: VerifyPaymentParams): Promise<VerifyPaymentResult> {
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
  async createOrder(params: CreateOrderParams): Promise<PaymentOrderResult> {
    const res = await fetch('/api/payments/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error || 'Failed to initialize payment gateway order')
    }

    return {
      orderId: data.orderId,
      amount: data.amount / 100,
      amountPaise: data.amount,
      currency: data.currency,
      provider: 'razorpay',
      keyId: data.keyId,
    }
  }

  async verifyPayment(params: VerifyPaymentParams): Promise<VerifyPaymentResult> {
    const res = await fetch('/api/payments/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    })

    const data = await res.json()
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Payment signature verification failed')
    }

    return {
      success: true,
      message: data.message,
      paymentId: data.paymentId,
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
  const providerType = process.env.NEXT_PUBLIC_PAYMENT_PROVIDER || process.env.PAYMENT_PROVIDER || 'razorpay'
  if (providerType === 'mock') {
    return new MockPaymentProvider()
  }
  return new RazorpayPaymentProvider()
}
