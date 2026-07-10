import { Component, useState } from 'react'
import Home from './pages/Home.jsx'
import Payment from './pages/Payment.jsx'
import './App.css'

const starterCheckout = {
  name: 'Starter Web Build',
  description: 'Frontend handoff, backend setup, and deployment-ready polish.',
  amount: 1,
  customer: {
    name: '',
    email: '',
    phone: '',
  },
}

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <main className="page-shell">
          <section className="fallback-panel">
            <p className="eyebrow">Something broke</p>
            <h1>Payment screen could not load.</h1>
            <p className="lede">{this.state.error.message}</p>
            <button
              type="button"
              className="primary-action"
              onClick={() => this.setState({ error: null })}
            >
              Go back
            </button>
          </section>
        </main>
      )
    }

    return this.props.children
  }
}

function App() {
  const [checkout, setCheckout] = useState(null)
  const [receipt, setReceipt] = useState(null)

  const handleCheckout = (details) => {
    setReceipt(null)
    setCheckout({
      ...starterCheckout,
      ...details,
      customer: {
        ...starterCheckout.customer,
        ...details.customer,
      },
    })
  }

  const handlePaid = (order) => {
    setReceipt(order)
    setCheckout(null)
  }

  return (
    <AppErrorBoundary key={checkout ? 'payment' : 'home'}>
      {checkout ? (
        <Payment checkout={checkout} onBack={() => setCheckout(null)} onPaid={handlePaid} />
      ) : (
        <Home packageDetails={starterCheckout} receipt={receipt} onCheckout={handleCheckout} />
      )}
    </AppErrorBoundary>
  )
}

export default App
