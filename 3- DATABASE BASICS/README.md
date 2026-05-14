# Database Basics - Notes App with MongoDB

This project builds upon the REST API fundamentals from the **NOTES_APP** project and introduces **databases** to make your application data permanent. Instead of storing notes in memory (which disappears when the server restarts), we now store them in **MongoDB**.

---

## 🎓 Evolution: From NOTES_APP to Database Basics

### What Changed?

| Aspect | NOTES_APP (Memory) | Database Basics (MongoDB) |
|--------|-------------------|--------------------------|
| **Data Storage** | JavaScript array in memory | MongoDB database on disk |
| **Data Persistence** | Lost when server restarts ❌ | Saved forever ✅ |
| **Scalability** | Limited to server RAM | Can store millions of records |
| **Real-world Use** | Learning only | Production-ready |
| **Code Pattern** | Synchronous | Asynchronous (async/await) |

---

## 🗄️ What is a Database?

A **database** is an organized collection of structured data stored on a computer (or server) that you can:
- **Create** (add new data)
- **Read** (retrieve data)
- **Update** (modify existing data)
- **Delete** (remove data)

Think of it like a filing cabinet:
- **NOTES_APP**: Sticky notes scattered on your desk (RAM - disappears when you leave)
- **Database**: Organized filing cabinet in your office (persistent storage - always there)

---

## 📊 What is MongoDB?

**MongoDB** is a popular NoSQL database that stores data in **JSON-like format** called **BSON** (Binary JSON).

### Key Differences from Traditional Databases

| Feature | MongoDB | Traditional SQL |
|---------|---------|-----------------|
| **Format** | JSON documents | Tables with rows/columns |
| **Flexibility** | Easy to add new fields | Rigid structure |
| **Learning Curve** | Beginner-friendly | Steeper |
| **Perfect for** | Web/Node.js projects | Enterprise applications |

### Real-world Analogy

```
Traditional Database (SQL):
┌─────────────────────────────────┐
│ NOTES TABLE                     │
├──────┬──────────────┬──────────┤
│ ID   │ TITLE        │ DESC     │
├──────┼──────────────┼──────────┤
│ 1    │ Note 1       │ Content 1│
│ 2    │ Note 2       │ Content 2│
└──────┴──────────────┴──────────┘

MongoDB (NoSQL - Document-based):
{
  _id: 1,
  title: "Note 1",
  description: "Content 1"
}
{
  _id: 2,
  title: "Note 2",
  description: "Content 2"
}
```

---

## 🔗 What is Mongoose?

**Mongoose** is a library that connects Node.js to MongoDB and makes it easier to work with databases.

**Think of it like:**
- MongoDB = The actual database (storage)
- Mongoose = The interface/translator between your Node.js code and MongoDB

```
Your Node.js Code 
    ↓ (Mongoose translates)
MongoDB Database
    ↓ (Returns data)
Your Node.js Code
```

### Why Mongoose?

1. **Structure**: Create schemas to organize your data
2. **Validation**: Check data before saving
3. **Easy syntax**: Less boilerplate code
4. **Popular**: Used in most MERN projects

---

## ⚡ Understanding async/await

**async/await** is a modern way to handle asynchronous operations (operations that take time to complete).

### Why Do We Need async/await?

Database operations are **slow** compared to other operations:
- Reading a file: ~10ms
- Database query: ~50-200ms

If we waited for each operation synchronously (one after another), our app would freeze!

**async/await** lets us:
1. Start a database operation
2. Continue doing other things
3. Return to it when it's done

### Synchronous vs Asynchronous

```javascript
// SYNCHRONOUS (Blocking) - App freezes while waiting
console.log("Starting...")
const result = database.find()  // App waits here... 100ms frozen!
console.log("Got result:", result)
console.log("Continuing...") // This runs after the wait

// ASYNCHRONOUS (Non-blocking) - App keeps running
console.log("Starting...")
const result = await database.find()  // App continues immediately
console.log("Got result:", result)
console.log("Continuing...") // This runs instantly
```

### async/await Syntax Explained

```javascript
// 1. The function must be declared as 'async'
async function getNote() {

    // 2. Use 'await' before operations that take time
    const note = await noteModel.find()
    
    // 3. After await completes, work with the result
    console.log(note)
}

// Calling the async function
getNote()  // This returns a Promise
```

### Real-world Analogy

```
Synchronous (Blocking):
You go to a restaurant, order food, and stand at the counter 
waiting for 30 minutes. Everything stops until your food arrives.

Asynchronous (Non-blocking):
You go to a restaurant, order food, sit down, and do other things 
(eat appetizers, chat, read). The waiter brings your food when ready.
```

---

## 📝 MongoDB Schema & Model Explained

### What is a Schema?

A **schema** defines the structure of your data - like a blueprint.

📁 File: [src/models/note.models.js](src/models/note.models.js)

```javascript
const mongoose = require("mongoose")

// Define the structure
const noteSchema = new mongoose.Schema({
    title: String,           // title must be a string
    description: String      // description must be a string
})

// Create a model from the schema
const noteModel = mongoose.model("note", noteSchema)

module.exports = noteModel
```

**What this means:**
- Every note MUST have `title` and `description` fields
- Both must be strings
- MongoDB automatically adds `_id` (unique identifier)

### Example Document in MongoDB

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "title": "Learning MongoDB",
  "description": "This is my first note stored in a database!"
}
```

---

## 🗄️ Connecting to MongoDB

📁 File: [src/db/db.js](src/db/db.js)

```javascript
const mongoose = require("mongoose")

async function connectDB() {
    // Connect to MongoDB running on localhost:27017
    await mongoose.connect("mongodb://localhost:27017/tutorial")
    console.log("Connected to mongoDB")
}

module.exports = connectDB
```

**What's happening:**
- `mongodb://localhost:27017` = Location of MongoDB (your computer)
- `tutorial` = Database name (creates it if doesn't exist)
- `async` function because connection takes time
- `await` waits for connection to complete before proceeding

---

## 🚀 REST API with Database

Now let's see how each REST API method works with MongoDB:

### 1. POST - Create a Note

📁 File: [src/app.js](src/app.js) (Lines 5-17)

```javascript
//POST 
app.post("/notes", async (req, res) => {
    const data = req.body

    // Create a new document in the database
    await noteModel.create({
        title: data.title,
        description: data.description
    })
    console.log("Data Posted")

    res.status(201).json({
        message: "Note Created Succesfully"
    })
})
```

**How it works:**
1. Client sends JSON with title and description
2. `await noteModel.create()` - Saves to MongoDB database
3. Returns success message
4. **Data persists** even after server restarts ✅

**Example Request (Postman):**
```
POST: http://localhost:3000/notes
Body:
{
  "title": "MongoDB Learning",
  "description": "Learning about databases"
}
```

---

### 2. GET - Retrieve Notes

📁 File: [src/app.js](src/app.js) (Lines 19-31)

```javascript
//GET 
app.get("/notes", async (req, res) => {
    // Find ONE specific note by title
    const notes = await noteModel.findOne({
        title: "day2"
    })
    
    res.status(200).json({
        message: "Note Fatched Succesfully",
        notes: notes
    })
})
```

**Key MongoDB Methods:**

```javascript
// Get one note
const note = await noteModel.findOne({ title: "day2" })
// Returns: { _id: ..., title: "day2", description: "..." } or null

// Get all notes
const allNotes = await noteModel.find()
// Returns: [{ _id: ..., title: ..., description: ... }, {...}, ...]

// Get by ID
const note = await noteModel.findById(id)
// Returns: { _id: ..., title: ..., description: ... } or null
```

**Example Request (Postman):**
```
GET: http://localhost:3000/notes
(No body needed)
```

---

### 3. DELETE - Remove a Note

📁 File: [src/app.js](src/app.js) (Lines 33-41)

```javascript
//DELETE
app.delete("/notes/:day", async(req, res) => {
    const day = req.params.day  // Get the title from URL (/notes/day2)
    
    // Find and delete one document matching the title
    await noteModel.findOneAndDelete({
        title: day
    })
    
    res.status(200).json({
        message: "Note Deleted Succesfully"
    })
})
```

**How it works:**
1. URL parameter `:day` contains the note title to delete
2. `findOneAndDelete()` finds a note with that title and removes it from database
3. **Deleted permanently** from MongoDB ❌

**Example Request (Postman):**
```
DELETE: http://localhost:3000/notes/day2
(No body needed)
```

---

### 4. PATCH - Update a Note

📁 File: [src/app.js](src/app.js) (Lines 43-55)

```javascript
//PATCH
app.patch("/notes/:day", async(req, res) => {
    const title = req.params.day              // Title from URL
    const description = req.body.description   // New description from body

    // Find note by title and update its description
    await noteModel.findOneAndUpdate({
        title: title
    }, {
        description: description
    })
    
    res.status(200).json({
        message: "Note Updated Sucessfully"
    })
})
```

**How it works:**
1. Find note by title (from URL)
2. Update only the description field
3. Other fields remain unchanged

**Example Request (Postman):**
```
PATCH: http://localhost:3000/notes/day2
Body:
{
  "description": "Updated description text"
}
```

---

## 📂 Project Structure

```
3- DATABASE BASICS/
├── server.js              # Server entry point
├── package.json           # Dependencies (express, mongoose, etc.)
├── README.md             # This file
└── src/
    ├── app.js            # All REST API routes with database operations
    ├── db/
    │   └── db.js         # MongoDB connection setup
    └── models/
        └── note.models.js # Schema and Model definition
```

**File Relationships:**
```
server.js 
  → requires app.js
      → requires noteModel (from note.models.js)
      → requires connectDB (from db.js)
```

---

## ⚙️ Setup & Installation

### Prerequisites

1. **Node.js** - Download from [https://nodejs.org/](https://nodejs.org/)
2. **MongoDB** - Download from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
3. **MongoDB running** - Start MongoDB service before running this project

### Step 1: Start MongoDB

**On Windows (PowerShell as Administrator):**
```bash
# MongoDB typically installs as a service
# Check if it's running: Press Win+R, type "services.msc", look for MongoDB

# Or start from terminal:
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"
```

**On Mac/Linux:**
```bash
brew services start mongodb-community
# or
mongod
```

**Verify MongoDB is running:**
```bash
mongo  # or mongosh
> show dbs  # Should show database list
```

### Step 2: Install Dependencies

```bash
cd "3- DATABASE BASICS"
npm install
```

This installs:
- `express` - Web framework
- `mongoose` - MongoDB connector
- `nodemon` - Auto-restart server (optional)

### Step 3: Start the Server

```bash
npm start
# or with auto-reload:
npx nodemon server.js
```

**Expected output:**
```
Connected to mongoDB
Server is running on PORT 3000
```

---

## 📮 Testing with Postman

### Setup: Create a Collection

1. Open Postman
2. Click **"New Collection"**
3. Name it: `Database Basics - Notes App`
4. Save all requests in this collection

---

### TEST 1: Create a Note (POST)

**Setup:**
1. Click **"New"** → **"HTTP Request"**
2. Set method to **POST**
3. URL: `http://localhost:3000/notes`
4. Click **Body** tab
5. Select **raw** → **JSON**

**Send this:**
```json
{
  "title": "MongoDB Day 1",
  "description": "Learning about MongoDB and Mongoose"
}
```

**Expected Response (201 Created):**
```json
{
  "message": "Note Created Succesfully"
}
```

✅ **Verify in MongoDB:**
Open terminal and run:
```bash
mongo  # or mongosh
> use tutorial
> db.notes.find()  # Shows your created note
```

---

### TEST 2: Create Multiple Notes

Create at least 3 more notes with different titles:

```json
{
  "title": "day2",
  "description": "Understanding Mongoose models"
}
```

```json
{
  "title": "Async Await",
  "description": "Learning async/await patterns"
}
```

```json
{
  "title": "REST API",
  "description": "Complete REST API with database"
}
```

---

### TEST 3: Get a Note (GET)

**Setup:**
1. Click **"New"** → **"HTTP Request"**
2. Set method to **GET**
3. URL: `http://localhost:3000/notes`
4. Body tab will be empty (GET doesn't need body)

**Click Send**

**Expected Response (200 OK):**
```json
{
  "message": "Note Fatched Succesfully",
  "notes": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "day2",
    "description": "Understanding Mongoose models"
  }
}
```

💡 **Note:** The current GET only retrieves notes with title "day2". To get all notes, change line in app.js:
```javascript
const notes = await noteModel.find()  // Gets ALL notes
```

---

### TEST 4: Update a Note (PATCH)

**Setup:**
1. Click **"New"** → **"HTTP Request"**
2. Set method to **PATCH**
3. URL: `http://localhost:3000/notes/day2`
4. Click **Body** tab → **raw** → **JSON**

**Send this:**
```json
{
  "description": "Updated: MongoDB is awesome!"
}
```

**Expected Response (200 OK):**
```json
{
  "message": "Note Updated Sucessfully"
}
```

✅ **Verify:** Run the GET request again to see updated description

---

### TEST 5: Delete a Note (DELETE)

**Setup:**
1. Click **"New"** → **"HTTP Request"**
2. Set method to **DELETE**
3. URL: `http://localhost:3000/notes/MongoDB Day 1`
4. Body tab will be empty

**Click Send**

**Expected Response (200 OK):**
```json
{
  "message": "Note Deleted Succesfully"
}
```

✅ **Verify in MongoDB:**
```bash
mongo
> use tutorial
> db.notes.find()  # Note should be gone!
```

---

## 📊 Quick Reference Table

| Operation | HTTP Method | URL | Body | MongoDB Method |
|-----------|-------------|-----|------|-----------------|
| **Create** | POST | `/notes` | `{title, description}` | `noteModel.create()` |
| **Read** | GET | `/notes` | None | `noteModel.findOne()` or `find()` |
| **Update** | PATCH | `/notes/:day` | `{description}` | `noteModel.findOneAndUpdate()` |
| **Delete** | DELETE | `/notes/:day` | None | `noteModel.findOneAndDelete()` |

---

## 🔑 Important Concepts Recap

### Async/Await Key Points

```javascript
// 1. Function must be async
async function getData() {
    
    // 2. Use await for time-consuming operations
    const data = await database.find()
    
    // 3. Code after await runs AFTER operation completes
    console.log(data)
}

// 4. Call async function (returns Promise)
getData()
```

### MongoDB Query Patterns

```javascript
// Find one document
const note = await Note.findOne({ title: "day2" })

// Find all documents
const notes = await Note.find()

// Find by ID
const note = await Note.findById(id)

// Update one document
await Note.findOneAndUpdate({ title: "day2" }, { description: "new" })

// Delete one document
await Note.findOneAndDelete({ title: "day2" })
```

---

## 🎯 Key Differences: NOTES_APP vs Database Basics

### NOTES_APP (Memory Storage)
- ❌ Data lost when server restarts
- ✅ Fast (data in RAM)
- ✅ Simple to understand
- ❌ Not production-ready

### Database Basics (MongoDB)
- ✅ Data persists forever
- ⚠️ Slightly slower (disk I/O)
- ✅ More complex but powerful
- ✅ Production-ready
- ✅ Uses async/await patterns

---

## 🚀 Next Steps

After mastering this project:

1. **Add validation**: Check if title/description are empty before saving
2. **Add timestamps**: Track when notes were created/updated
3. **Add user authentication**: Only allow logged-in users to access notes
4. **Add search**: Find notes by keyword
5. **Add sorting**: Display newest notes first
6. **Deploy to cloud**: Use MongoDB Atlas (cloud version)

---

## 🔗 Learning Path

```
1. NOTES_APP (Memory)
   ↓ (Learn REST API basics)
   ↓
2. DATABASE BASICS (MongoDB)
   ↓ (Learn database & async/await)
   ↓
3. PRACTICE BACKEND (Full MERN)
   ↓ (Add authentication, validation, frontend)
   ↓
4. Production Ready App
   ↓ (Deploy to cloud!)
```

---

## 📚 Mongoose & MongoDB Methods Cheat Sheet

### Mongoose Methods Used

```javascript
// Create new document
await Model.create({ field: value })

// Find one document
await Model.findOne({ field: value })

// Find all documents
await Model.find()

// Find by ID
await Model.findById(id)

// Update one document
await Model.findOneAndUpdate({ field: value }, { newField: newValue })

// Delete one document
await Model.findOneAndDelete({ field: value })
```

---

## 🆘 Troubleshooting

**❌ "Cannot connect to MongoDB"**
- Ensure MongoDB is running
- Check MongoDB service is active
- Try: `mongod` in terminal to manually start

**❌ "Model is not defined"**
- Make sure you're requiring the noteModel correctly
- Check file path: `const noteModel = require("./models/note.models")`

**❌ "await is only valid in async function"**
- Make sure your function is declared as `async`
- Example: `app.post("/notes", async (req, res) => {...})`

**❌ "SyntaxError: Unexpected token"**
- Check JSON format in Postman body (no trailing commas, proper quotes)
- Verify "raw" and "JSON" are selected in Postman Body tab

**❌ No response from GET request**
- Ensure you've created notes first with POST request
- MongoDB database might be empty

---

## 💡 Pro Tips

1. **Check your data**: Use MongoDB Compass (GUI tool) to visualize data
2. **Use better queries**: Replace hardcoded "day2" with dynamic parameters
3. **Add error handling**: Use try-catch to handle database errors
4. **Validate input**: Check data before saving to database
5. **Use ObjectId**: When querying by ID, use MongoDB's ObjectId format

---

**Happy Learning! You've now mastered Database Basics! 🎓🚀**
