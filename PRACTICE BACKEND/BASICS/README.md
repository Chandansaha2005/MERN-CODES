# Node.js Backend Basics

## What are APIs?

**API** stands for **Application Programming Interface**. It's a set of rules and protocols that allows different software applications to communicate with each other.

### In simple terms:
- An API is like a waiter in a restaurant
- The customer (client/frontend) orders food (makes a request)
- The waiter takes the order to the kitchen (backend/server)
- The kitchen prepares the food (processes the request)
- The waiter brings the food back (server sends response)

### Types of APIs:
1. **REST API** - The most common type used in web development
2. **GraphQL API** - Modern alternative to REST
3. **SOAP API** - Older, more complex protocol
4. **gRPC API** - High-performance API framework

### In our code:
When you access `http://localhost:3000/`, you're calling an API endpoint that responds with "Hello world"

---

## What are Ports?

A **port** is a virtual point where network connections start and end. It allows a single computer to host multiple services.

### Understanding Ports:
- **Range:** 0 - 65535
- **Well-known ports:** 0 - 1023 (used by system services)
  - Port 80: HTTP (web traffic)
  - Port 443: HTTPS (secure web traffic)
  - Port 25: SMTP (email)
- **User ports:** 1024 - 49151 (can be used by applications)
- **Dynamic ports:** 49152 - 65535 (temporary connections)

### Why do we use Port 3000?
```
Port 3000 is commonly used in development because:
✓ It's in the "user ports" range (safe to use)
✓ It's not used by system services by default
✓ It's a convention for Node.js/Express development
✓ Multiple developers use it, making it familiar
```

### In our code:
```javascript
app.listen("3000", () => {
    console.log("Server is created")
})
```
This tells the Express server to listen on port 3000 for incoming requests.

---

## Complete Code Explanation

### Project Structure:
```
BASICS/
├── package.json      (Dependencies)
├── README.md         (Documentation - you are here!)
├── server.js         (Entry point - Root file)
└── src/
    └── app.js        (Express app configuration)
```

---

## Step-by-Step: How Our Code Works

### Step 1: Create Express Instance (src/app.js)

```javascript
// Import Express library
const express = require("express")

// Create an instance of Express
// This instance (app) contains all methods to handle requests
const app = express()

// Export the app so it can be used in other files
module.exports = app
```

**What's happening:**
- We import Express from node_modules
- We create an `app` object which is our Express application
- This `app` object has methods like `.get()`, `.post()`, `.listen()`, etc.
- We export it so `server.js` can use it

---

### Step 2: Import App and Setup Routes (server.js)

```javascript
// Import the Express app instance from src/app.js
const app = require("./src/app")

// Create a route for the home page (GET request to /)
app.get("/", (req, res) => {
    console.log("Server is running")
    res.send("Hello world")
})
```

**What's happening:**
- We import the `app` we created in `app.js`
- `app.get()` creates a route handler for GET requests
- The function receives `req` (request) and `res` (response)
- `req` contains information about what the client sent
- `res` is used to send data back to the client
- `res.send()` sends "Hello world" back to the browser

**Example:** When you visit `http://localhost:3000/`, the browser:
1. Sends a GET request to `/`
2. Express matches it with our route handler
3. The function executes, logging "Server is running"
4. The browser receives "Hello world"

---

### Step 3: Start the Server (server.js)

```javascript
// Start listening on port 3000
app.listen("3000", () => {
    console.log("Server is created")
})
```

**What's happening:**
- `app.listen()` starts the HTTP server
- First argument: port number (3000)
- Second argument: callback function that runs when server starts
- The message "Server is created" appears in the console

**Flow Summary:**
```
┌─────────────────────────────────────────┐
│ 1. Run: node server.js                  │
│                                         │
│ 2. Node executes server.js              │
│    ↓                                    │
│ 3. Requires "./src/app"                 │
│    ↓                                    │
│ 4. app.js runs: creates Express instance│
│    ↓                                    │
│ 5. Returns to server.js                 │
│    ↓                                    │
│ 6. Define route: app.get("/", ...)      │
│    ↓                                    │
│ 7. Start server: app.listen(3000)       │
│    ↓                                    │
│ 8. Console: "Server is created"         │
│    ↓                                    │
│ 9. Server is now RUNNING and waiting    │
│    for requests on http://localhost:3000│
└─────────────────────────────────────────┘
```

---

## How to Run This Project

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
node server.js
```

### 3. Test the API
- Open your browser
- Go to: `http://localhost:3000`
- You should see: **"Hello world"**
- Your terminal shows: **"Server is running"**

---

## Key Concepts to Remember

| Concept | Meaning |
|---------|---------|
| **Express** | A Node.js framework for building web applications |
| **app** | The Express application instance that handles requests |
| **Route** | A URL path like `/` or `/users` |
| **GET Request** | Asking the server for data (like visiting a website) |
| **Port** | A virtual channel for network communication |
| **localhost** | Your own computer (127.0.0.1) |
| **Middleware** | Functions that process requests before they reach routes |

---

## File Responsibilities

### server.js (Root - Entry Point)
- ✅ Imports the Express app
- ✅ Defines API routes and endpoints
- ✅ Starts the server with `app.listen()`
- ✅ This is the main file you run with `node server.js`

### src/app.js (Source - App Configuration)
- ✅ Creates the Express application instance
- ✅ Sets up middleware (we'll learn this later)
- ✅ Configures the app
- ✅ Exports the app for use in server.js

---

## Next Steps to Learn

1. **Create more routes** - Add GET/POST endpoints
2. **Learn Middleware** - Process requests before routes
3. **Connect to Database** - Store and retrieve data
4. **Handle Error** - Proper error handling
5. **Environment Variables** - Use `.env` for configuration

---

## Running the Project Commands

```bash
# Install dependencies (first time)
npm install

# Start the server
node server.js

# Or use nodemon for auto-restart on file changes
npm install -D nodemon
npx nodemon server.js
```

---

**Happy Learning! 🚀**
