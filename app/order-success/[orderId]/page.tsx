import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { OrderRepository } from '@/lib/data/repositories'
import { CheckCircle2, Clock, Package, Truck, Check, ArrowRight, ShoppingBag } from 'lucide-react'

interface Props {
  params: { orderId: string }
}

export const metadata: Metadata = {
  title: 'Order Confirmed | Vaishnava Mart',
}

const timelineStages = [
  { key: 'received', label: 'Order Received' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'processing', label: 'Processing' },
  { key: 'packed', label: 'Packed' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'out_for_delivery', label: 'Out for Delivery' },
  { key: 'delivered', label: 'Delivered' },
]

export default async function OrderSuccessPage({ params }: Props) {
  const order = await OrderRepository.getOrderById(params.orderId)
  if (!order) notFound()

  const currentStageIndex = timelineStages.findIndex((s) => s.key === order.orderStatus)
  const activeIndex = currentStageIndex >= 0 ? currentStageIndex : 1 // default confirmed

  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20 border-b border-sand">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        {/* Success Banner */}
        <div className="text-center bg-porcelain p-8 sm:p-12 rounded-3xl border border-sand shadow-sm space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-botanical/15 text-botanical flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest text-copper block">
            Thank You For Honoring Purity
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-cocoa">
            Your Order is Confirmed
          </h1>
          <p className="text-xs sm:text-sm text-taupe max-w-md mx-auto">
            Order <span className="font-mono font-bold text-burgundy">#{order.orderNumber}</span> has been reverently received and assigned to our cleanroom packing team.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link href="/account/orders" className="btn-secondary text-xs h-10 px-5">
              <span>View in My Orders</span>
            </Link>
            <Link href="/shop" className="btn-primary text-xs h-10 px-6">
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Order Tracking Timeline */}
        <div className="mt-8 bg-porcelain p-6 sm:p-8 rounded-3xl border border-sand shadow-sm space-y-6">
          <h2 className="font-serif text-2xl text-cocoa flex items-center gap-2">
            <Clock className="w-5 h-5 text-burgundy" /> Order Tracking Timeline
          </h2>

          <div className="overflow-x-auto pb-4">
            <div className="min-w-[620px] flex items-center justify-between relative px-4">
              {/* Connecting line */}
              <div className="absolute top-4 left-8 right-8 h-1 bg-sand z-0" />
              <div
                className="absolute top-4 left-8 h-1 bg-burgundy z-0 transition-all duration-500"
                style={{ width: `${(activeIndex / (timelineStages.length - 1)) * 90}%` }}
              />

              {timelineStages.map((stage, idx) => {
                const isPassed = idx <= activeIndex
                const isCurrent = idx === activeIndex
                return (
                  <div key={stage.key} className="relative z-10 flex flex-col items-center text-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-burgundy text-ivory ring-4 ring-burgundy/20 scale-110 shadow-md'
                          : isPassed
                          ? 'bg-burgundy text-ivory'
                          : 'bg-ivory border-2 border-sand text-taupe'
                      }`}
                    >
                      {isPassed ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                    </div>
                    <span
                      className={`text-[11px] font-sans mt-2 whitespace-nowrap ${
                        isCurrent ? 'font-bold text-burgundy' : isPassed ? 'text-cocoa font-medium' : 'text-taupe'
                      }`}
                    >
                      {stage.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Order Breakdown Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Items List */}
          <div className="bg-porcelain p-6 rounded-3xl border border-sand space-y-4">
            <h3 className="font-serif text-xl text-cocoa flex items-center gap-2">
              <Package className="w-4 h-4 text-copper" /> Ordered Items ({order.items.length})
            </h3>
            <div className="divide-y divide-sand">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-ivory border border-sand flex-shrink-0">
                      <Image
                        src={item.imageSnapshot}
                        alt={item.productNameSnapshot}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-cocoa">{item.productNameSnapshot}</p>
                      <p className="text-taupe font-mono">Qty: {item.quantity} × ₹{item.priceSnapshot}</p>
                    </div>
                  </div>
                  <span className="font-bold text-sm text-cocoa">₹{item.priceSnapshot * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-sand space-y-1.5 text-xs text-taupe">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{order.shipping === 0 ? 'Free' : `₹${order.shipping}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-cocoa pt-2 border-t border-sand">
                <span>Total Amount Paid</span>
                <span className="text-burgundy text-base">₹{order.finalTotal}</span>
              </div>
            </div>
          </div>

          {/* Delivery & Payment Snapshots */}
          <div className="bg-porcelain p-6 rounded-3xl border border-sand space-y-6">
            <div>
              <h3 className="font-serif text-xl text-cocoa flex items-center gap-2 mb-3">
                <Truck className="w-4 h-4 text-copper" /> Delivery Information
              </h3>
              <div className="p-4 bg-ivory rounded-2xl border border-sand text-xs space-y-1 text-taupe">
                <p className="font-semibold text-cocoa text-sm">{order.deliveryAddressSnapshot.fullName}</p>
                <p>{order.deliveryAddressSnapshot.line1}, {order.deliveryAddressSnapshot.area}</p>
                <p>{order.deliveryAddressSnapshot.city}, {order.deliveryAddressSnapshot.state} - {order.deliveryAddressSnapshot.pin}</p>
                <p className="font-mono pt-1 text-cocoa">Phone: {order.deliveryAddressSnapshot.phone}</p>
                {order.notes && <p className="italic pt-2">Note: &ldquo;{order.notes}&rdquo;</p>}
              </div>
            </div>

            <div>
              <h3 className="font-serif text-xl text-cocoa mb-3">Payment Record</h3>
              <div className="p-4 bg-ivory rounded-2xl border border-sand text-xs space-y-1 text-taupe">
                <div className="flex justify-between">
                  <span>Payment Status:</span>
                  <span className="font-semibold text-botanical uppercase">{order.paymentState}</span>
                </div>
                <div className="flex justify-between">
                  <span>Method:</span>
                  <span className="font-medium text-cocoa uppercase">{order.paymentMethod}</span>
                </div>
                {order.paymentId && (
                  <div className="flex justify-between font-mono text-[11px]">
                    <span>Reference ID:</span>
                    <span>{order.paymentId}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
