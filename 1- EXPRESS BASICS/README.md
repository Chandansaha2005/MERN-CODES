# Express.js - Backend Web Framework Guide

## Table of Contents
1. [Library vs Framework](#library-vs-framework)
2. [What is Express](#what-is-express)
3. [Getting Started](#getting-started)
4. [Ports](#ports)
5. [Request & Response](#request--response)
6. [Routing](#routing)
7. [Path Parameters](#path-parameters)
8. [Query Parameters](#query-parameters)
9. [HTTP Methods](#http-methods)
10. [Nodemon](#nodemon)

---

## Library vs Framework

### Library
A collection of reusable code that can be used to perform specific tasks.
- **Example:** Axios - used for making HTTP requests
- You call library functions when you need them
- More flexibility but requires more code structure

### Framework
A set of pre-written code that provides structure for developing applications.
- **Example:** Express - provides structure for building web servers
- Offers a skeleton/template for your application
- Less flexibility but faster development with built-in patterns

---

## What is Express

**Express.js** is a lightweight Node.js web application framework designed to build web servers and APIs.

### Purpose
Express helps us to:
- Listen for incoming HTTP requests
- Parse request data
- Route requests to appropriate handlers
- Send appropriate responses
- Handle middleware for processing requests

### Why Use Express?
- Minimalist and fast
- Easy to learn
- Perfect for building RESTful APIs
- Built-in routing system
- Middleware support

---

## Getting Started

### Basic Setup

```javascript
const express = require("express")  // Import Express
const app = express()               // Create server instance
const port = 3000                   // Define port number

// Start server and listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
```

### What Happens?
1. `require("express")` - Imports the Express module
2. `express()` - Creates a new Express application instance
3. `app.listen(port)` - Starts the server on specified port
4. The callback function runs when server starts successfully

---

## Ports

### What is a Port?

A **port** is a logical endpoint of a network connection used to exchange information between a web server and web client.

### Key Concepts
- **Port Numbers:** Range from 0 to 65535
- **Common Ports:**
  - `80` - HTTP (default web traffic)
  - `443` - HTTPS (secure web traffic)
  - `3000, 5000, 8000` - Common development ports
  
### Example
```javascript
const port = 3000
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})
```

When you visit `http://localhost:3000` in your browser, you're connecting to port 3000.

---

## Request & Response

### Request (req)
The **request object** contains information about the client's HTTP request:
- URL path
- HTTP method (GET, POST, etc.)
- Headers
- Body (for POST/PUT requests)
- Query parameters
- Path parameters

### Response (res)
The **response object** allows you to send data back to the client:
- Text messages
- JSON data
- HTML content
- Status codes

### Basic Example

```javascript
app.get("/", (req, res) => {
    res.send("Hello from the server!")
})
```

Output: When you visit `http://localhost:3000`, you see "Hello from the server!"

### Sending Different Response Types

```javascript
// 1. Send plain text
res.send("Hello World")

// 2. Send JSON
res.send({
    name: "chandan",
    age: 25
})

// 3. Send HTML
res.send("<h1>Welcome to My Server</h1>")
```

---

## Routing

### What is Routing?

**Routing** is the process of selecting a path for data in a network. In web applications, routing matches URL paths to specific handler functions.

### How it Works
1. Client makes a request to a specific URL path
2. Server checks which route matches that path
3. Executes the corresponding handler function
4. Sends response back to client

### Basic Routes

```javascript
// Route 1: Root path
app.get("/", (req, res) => {
    res.send("Welcome to home page")
})

// Route 2: About page
app.get("/route1", (req, res) => {
    res.send("This is route1")
})

// Route 3: Contact page
app.get("/route2", (req, res) => {
    res.send("This is route2")
})
```

### Visiting Routes
- `http://localhost:3000/` → "Welcome to home page"
- `http://localhost:3000/route1` → "This is route1"
- `http://localhost:3000/route2` → "This is route2"

### 404 Route (Catch-All)

```javascript
// This must be LAST - catches all undefined routes
app.get('*', (req, res) => {
    res.send("❌ Page not found (404)")
})
```

---

## Path Parameters

### What are Path Parameters?

**Path parameters** are dynamic values in the URL path that change based on the request.

### Syntax
- Use `:parameterName` in the route definition
- Access with `req.params.parameterName`

### Single Parameter Example

```javascript
app.get("/:username", (req, res) => {
    const { username } = req.params
    res.send(`Welcome ${username}!`)
})
```

**Usage:**
- Visit `http://localhost:3000/chandan`
- Response: "Welcome chandan!"

- Visit `http://localhost:3000/john`
- Response: "Welcome john!"

### Multiple Parameters Example

```javascript
app.get("/:username/:id", (req, res) => {
    const { username, id } = req.params
    res.send(`User: ${username}, ID: ${id}`)
})
```

**Usage:**
- Visit `http://localhost:3000/chandan/123`
- Response: "User: chandan, ID: 123"

### Practical Use Case (REST API)

```javascript
// Get user by ID
app.get("/users/:userId", (req, res) => {
    const { userId } = req.params
    res.send(`Fetching user with ID: ${userId}`)
})

// Delete product by ID
app.get("/products/:productId/delete", (req, res) => {
    const { productId } = req.params
    res.send(`Deleting product: ${productId}`)
})
```

---

## Query Parameters

### What are Query Parameters?

**Query parameters** are optional parameters passed in the URL after a question mark (`?`).

### Syntax
- Format: `?key=value&key2=value2`
- Access with `req.query.parameterName`

### Basic Example

```javascript
app.get("/search", (req, res) => {
    const { q } = req.query
    
    if (!q) {
        res.send("Please provide a search query")
        return
    }
    
    res.send(`Search results for: ${q}`)
})
```

**Usage:**
- Visit `http://localhost:3000/search` → "Please provide a search query"
- Visit `http://localhost:3000/search?q=nodejs` → "Search results for: nodejs"
- Visit `http://localhost:3000/search?q=express` → "Search results for: express"

### Multiple Query Parameters

```javascript
app.get("/filter", (req, res) => {
    const { category, sort, page } = req.query
    
    res.send(`
        Category: ${category}
        Sort: ${sort}
        Page: ${page}
    `)
})
```

**Usage:**
- `http://localhost:3000/filter?category=books&sort=price&page=1`

### Real-World Example (E-commerce)

```javascript
// Filter products
app.get("/products", (req, res) => {
    const { category, priceMin, priceMax, inStock } = req.query
    
    res.send(`
        Filtering products:
        - Category: ${category || "All"}
        - Price: ${priceMin || "Any"} - ${priceMax || "Any"}
        - In Stock: ${inStock || "Any"}
    `)
})
```

---

## HTTP Methods

### What are HTTP Methods?

HTTP methods define the action you want to perform on a resource.

### Common Methods

| Method | Purpose | Example |
|--------|---------|---------|
| **GET** | Retrieve data | Fetch product details |
| **POST** | Create new data | Submit a form, create user |
| **PUT** | Update entire resource | Update user profile |
| **DELETE** | Remove data | Delete a product |
| **PATCH** | Partial update | Update one field |

### Examples

```javascript
// GET - Retrieve data
app.get("/users/:id", (req, res) => {
    res.send(`Getting user with ID: ${req.params.id}`)
})

// POST - Create data
app.post("/users", (req, res) => {
    res.send("User created successfully")
})

// PUT - Update entire resource
app.put("/users/:id", (req, res) => {
    res.send(`Updating user with ID: ${req.params.id}`)
})

// DELETE - Delete data
app.delete("/users/:id", (req, res) => {
    res.send(`Deleting user with ID: ${req.params.id}`)
})
```

---

## Nodemon

### What is Nodemon?

**Nodemon** is a development tool that automatically restarts your Node.js server whenever you save changes to your files.

### Problem it Solves
- Without nodemon: You must manually stop and restart server after every code change
- With nodemon: Server automatically restarts on file changes

### Installation

```bash
npm install -D nodemon
```

(The `-D` flag installs it as a development dependency)

### Setup in package.json

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

### Usage

```bash
npm run dev
```

Now your server will automatically restart whenever you save changes!

### Benefits
- Faster development cycle
- No need to manually restart
- Catch errors immediately
- Code changes reflect instantly

---

## Summary Quick Reference

### Setup Server
```javascript
const express = require("express")
const app = express()
app.listen(3000, () => console.log("Server running"))
```

### Basic Route
```javascript
app.get("/path", (req, res) => {
    res.send("Response")
})
```

### Path Parameters
```javascript
app.get("/users/:id", (req, res) => {
    console.log(req.params.id)  // Access path parameter
})
```

### Query Parameters
```javascript
app.get("/search", (req, res) => {
    console.log(req.query.q)  // Access query parameter
})
```

### Different HTTP Methods
```javascript
app.get()     // Read
app.post()    // Create
app.put()     // Update
app.delete()  // Delete
```

---

## Practice Exercises

1. Create routes for `/about`, `/contact`, `/services`
2. Create a route with path parameter: `/posts/:postId`
3. Create a search route that accepts query parameter `?search=value`
4. Create a POST route to handle form submissions
5. Use multiple path parameters in a route: `/users/:userId/posts/:postId`

---

## Next Topics to Learn
- Middleware
- Request/Response headers
- Parsing request body (express.json)
- Error handling
- Static file serving
- MVC Architecture
- Database integration
