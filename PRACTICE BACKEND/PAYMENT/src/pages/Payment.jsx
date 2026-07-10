import { useMemo, useState } from 'react'
import { QRCode } from 'react-qr-code'

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
const upiId = import.meta.env.VITE_UPI_ID || ''
const upiName = import.meta.env.VITE_UPI_NAME || 'Merchant'

function Payment({ checkout, onBack, onPaid }) {
  const safeCheckout = {
    name: checkout?.name || 'Starter Web Build',
    description: checkout?.description || '',
    amount: Number(checkout?.amount || 0),
    customer: {
      name: checkout?.customer?.name || '',
      email: checkout?.customer?.email || '',
      phone: checkout?.customer?.phone || '',
    },
  }

  const [transactionId, setTransactionId] = useState('')
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const upiLink = useMemo(() => {
    const params = new URLSearchParams({
      pa: upiId,
      pn: upiName,
      am: String(safeCheckout.amount),
      cu: 'INR',
      tn: safeCheckout.name,
    })

    return `upi://pay?${params.toString()}`
  }, [safeCheckout.amount, safeCheckout.name])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!transactionId.trim()) {
      setStatus({ type: 'error', message: 'Enter the UPI transaction ID after payment.' })
      return
    }

    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...safeCheckout,
          paymentMethod: 'UPI',
          transactionId: transactionId.trim(),
          paidTo: {
            name: upiName,
            upiId,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Payment confirmation failed.')
      }

      onPaid(data.order)
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Could not reach the backend. Start it and try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="payment-shell">
      <section className="payment-panel">
        <div className="payment-summary">
          <button type="button" className="ghost-action" onClick={onBack}>
            Back
          </button>
          <p className="eyebrow">UPI payment</p>
          <h1>Scan, pay, and confirm your transaction.</h1>
          <p className="lede">
            Pay Rs. {safeCheckout.amount} to {upiName}, then paste the UPI transaction ID so the
            backend can record your order.
          </p>

          <div className="summary-grid">
            <span>Package</span>
            <strong>{safeCheckout.name}</strong>
            <span>Customer</span>
            <strong>{safeCheckout.customer.name || 'Not provided'}</strong>
            <span>Amount</span>
            <strong>Rs. {safeCheckout.amount}</strong>
            <span>UPI ID</span>
            <strong>{upiId || 'Missing VITE_UPI_ID'}</strong>
          </div>
        </div>

        <div className="qr-panel">
          <div className="qr-code" aria-label="UPI payment QR code">
            {upiId ? <QRCode value={upiLink} size={216} /> : <p>UPI ID missing</p>}
          </div>

          <form className="confirm-form" onSubmit={handleSubmit}>
            <label>
              UPI transaction ID
              <input
                value={transactionId}
                onChange={(event) => setTransactionId(event.target.value)}
                placeholder="Example: 412345678901"
                required
              />
            </label>

            {status.message && <div className={`notice ${status.type}`}>{status.message}</div>}

            <button type="submit" className="primary-action" disabled={isSubmitting || !upiId}>
              {isSubmitting ? 'Recording payment...' : 'Confirm payment'}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Payment
