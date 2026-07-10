import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { randomUUID } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

dotenv.config()

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

const PORT = Number(process.env.PORT || 8000)
const CORS_ORIGIN = process.env.CORS_ORIGIN || process.env.cors_origin || 'http://localhost:5173'
const ordersFile = join(__dirname, 'data', 'orders.json')

app.use(
  cors({
    origin: CORS_ORIGIN,
  }),
)
app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    service: 'payment-backend',
    timestamp: new Date().toISOString(),
  })
})

app.post('/api/orders', async (request, response, next) => {
  try {
    const order = createOrder(request.body)
    const orders = await readOrders()
    orders.push(order)
    await saveOrders(orders)

    response.status(201).json({
      message: 'Order recorded successfully.',
      order,
    })
  } catch (error) {
    next(error)
  }
})

app.get('/api/orders', async (_request, response, next) => {
  try {
    const orders = await readOrders()
    response.json({ orders })
  } catch (error) {
    next(error)
  }
})

app.use((_request, response) => {
  response.status(404).json({ message: 'Route not found.' })
})

app.use((error, _request, response, next) => {
  void next

  response.status(error.statusCode || 500).json({
    message: error.message || 'Something went wrong.',
  })
})

app.listen(PORT, () => {
  console.log(`Payment backend running on http://localhost:${PORT}`)
})

function createOrder(body = {}) {
  const errors = []

  if (!body.name) errors.push('package name')
  if (!Number(body.amount) || Number(body.amount) <= 0) errors.push('amount')
  if (!body.customer?.name) errors.push('customer name')
  if (!body.customer?.email) errors.push('customer email')
  if (!body.customer?.phone) errors.push('customer phone')
  if (!body.transactionId) errors.push('transaction ID')
  if (!body.paidTo?.upiId) errors.push('UPI ID')

  if (errors.length) {
    throw httpError(400, `Missing required field: ${errors.join(', ')}.`)
  }

  return {
    orderId: randomUUID(),
    packageName: body.name,
    description: body.description || '',
    amount: Number(body.amount),
    currency: 'INR',
    paymentMethod: body.paymentMethod || 'UPI',
    transactionId: String(body.transactionId).trim(),
    paidTo: {
      name: body.paidTo.name || 'Merchant',
      upiId: body.paidTo.upiId,
    },
    customer: {
      name: body.customer.name,
      email: body.customer.email,
      phone: body.customer.phone,
    },
    createdAt: new Date().toISOString(),
  }
}

async function readOrders() {
  try {
    const file = await readFile(ordersFile, 'utf8')
    return JSON.parse(file)
  } catch {
    return []
  }
}

async function saveOrders(orders) {
  await mkdir(dirname(ordersFile), { recursive: true })
  await writeFile(ordersFile, JSON.stringify(orders, null, 2))
}

function httpError(statusCode, message) {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}
