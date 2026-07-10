import { useState } from 'react'
import heroImg from '../assets/hero.png'

function Home({ packageDetails, receipt, onCheckout }) {
  const [customer, setCustomer] = useState(packageDetails.customer)

  const handleChange = (event) => {
    const { name, value } = event.target
    setCustomer((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onCheckout({ customer })
  }

  return (
    <main className="page-shell">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Production-ready starter</p>
          <h1>Launch a clean React checkout with UPI payment.</h1>
          <p className="lede">
            A focused frontend and backend starter that takes customer details, opens a QR
            payment step, and records the submitted transaction with the local API.
          </p>

          <div className="trust-row" aria-label="Included features">
            <span>React frontend</span>
            <span>Node backend</span>
            <span>UPI QR</span>
          </div>
        </div>

        <div className="checkout-panel" aria-label="Checkout form">
          <img src={heroImg} alt="" className="panel-art" />
          <div>
            <p className="panel-label">Selected package</p>
            <h2>{packageDetails.name}</h2>
            <p>{packageDetails.description}</p>
          </div>

          <div className="price-line">
            <span>Total</span>
            <strong>Rs. {packageDetails.amount}</strong>
          </div>

          {receipt && (
            <div className="notice success">
              Order {receipt.orderId} recorded for transaction {receipt.transactionId}.
            </div>
          )}

          <form onSubmit={handleSubmit} className="checkout-form">
            <label>
              Name
              <input
                name="name"
                value={customer.name}
                onChange={handleChange}
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                value={customer.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>
            <label>
              Phone
              <input
                name="phone"
                value={customer.phone}
                onChange={handleChange}
                placeholder="10 digit mobile number"
                autoComplete="tel"
                minLength="10"
                required
              />
            </label>
            <button type="submit" className="primary-action">
              Continue to payment
            </button>
          </form>
        </div>
      </section>
    </main>
  )
};

export default Home;
