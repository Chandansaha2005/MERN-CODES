// ==================== EXPRESS.JS BASICS ====================
// This file demonstrates fundamental Express.js concepts:
// - Server creation and setup
// - Request/Response handling
// - Routing (GET, POST)
// - Path Parameters
// - Query Parameters

const express = require("express")  // Import Express module
const app = express()               // Create server instance
const print = console.log           // Shorthand for logging

// ==================== SERVER SETUP ====================
// Port: Logical endpoint for network communication
// Ports allow the web server to exchange information with web clients
const port = 3000

// Start the server and listen for incoming requests
app.listen(port, () => {
    print(`✓ Server is listening on port ${port}`)
    print(`✓ Visit: http://localhost:${port}`)
})


// ==================== MIDDLEWARE (OPTIONAL) ====================
// Middleware: A function that processes requests before they reach route handlers
// This is commented out but shows how to handle ALL requests globally

// app.use((req, res) => {
//     // Send a JSON response
//     res.send({
//         name: "chandan",
//         number: 123
//     });
//     
//     // Alternative: Send HTML response
//     // res.send("<h1>This is an example of Html Response</h1>");
// })

// ==================== ROUTING ====================
// Routing: Process of selecting a path for data in a network
// Routes match URL paths to specific request handlers

// GET Routes - Retrieve data (Read operation)
app.get("/", (req, res) => {
    res.send("✓ You connected with root path (/)")
})

app.get("/route1", (req, res) => {
    res.send("✓ You connected with /route1")
})

app.get("/route2", (req, res) => {
    res.send("✓ You connected with /route2")
})

// Catch-all route for undefined paths (uncomment to use)
// app.get('*', (req, res) => {
//     res.send("❌ Page not found (404)");
// });

// POST Routes - Send data to server (Create operation)
app.post("/", (req, res) => {
    res.send("✓ You connected with root path (/) using POST method")
})


// ==================== PATH PARAMETERS ====================
// Path Parameters: Dynamic route segments passed in the URL path
// Syntax: Use :parameterName in the route
// Access via: req.params

// Single parameter example
// app.get("/:username", (req, res) => {
//     print("Path Parameters:", req.params)  
//     // Example output: { username: 'chandan' }
//     res.send(`Welcome ${req.params.username} to the page!`)
// })

// Multiple parameters example
// app.get("/:username/:id", (req, res) => {
//     print("Path Parameters:", req.params)  
//     // Example output: { username: 'chandan', id: '5165' }
//     const { username, id } = req.params
//     res.send(`Welcome ${username}! Your ID is ${id}`)
// })

// ==================== QUERY PARAMETERS ====================
// Query Parameters: Optional parameters passed in the URL after '?'
// Syntax: ?key=value&key2=value2
// Access via: req.query
// Example: http://localhost:3000/search?q=javascript

app.get("/search", (req, res) => {
    const { q } = req.query  // Extract 'q' parameter from query string
    
    if (!q) {
        res.send("❌ Please provide a search query. Example: /search?q=nodejs")
        return
    }
    
    res.send(`✓ Search results for: "${q}"`)
})