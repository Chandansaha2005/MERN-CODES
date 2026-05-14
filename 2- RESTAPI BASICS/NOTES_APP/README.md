# Notes App - REST API Learning Project

This is a beginner-friendly REST API project built with **Node.js** and **Express.js**. The Notes App demonstrates all four main HTTP methods used in REST APIs through a simple note-taking application.

---

## 📚 What is REST API?

REST (Representational State Transfer) is an architectural style for building web services. It uses standard HTTP methods to perform operations on resources. 

**Key Concepts:**
- **Resources**: Data entities (in this case, "notes")
- **HTTP Methods**: Operations performed on resources (GET, POST, PUT/PATCH, DELETE)
- **Endpoints**: URL paths that define where requests are sent

---

## 🔧 REST API Methods Explained

This project implements four fundamental HTTP methods. Each method has a specific purpose:

### 1. **POST** - Create/Send Data to Server
**Purpose:** Create new data on the server  
**What it does:** Sends data from client to server to be stored

#### Code Reference
📁 File: `src/app.js` (Lines 10-17)

```javascript
//POST /notes // sending data to server 
app.post("/notes",(req,res)=>{
    notes.push(req.body)
    res.status(201).json({
        message:"Note created successfully"
    })
})
```

**How to use:**
- **Endpoint:** `POST http://localhost:3000/notes`
- **Send Data (JSON):**
  ```json
  {
    "title": "My First Note",
    "des": "This is my first note"
  }
  ```
- **Response (Status 201 - Created):**
  ```json
  {
    "message": "Note created successfully"
  }
  ```
- **Real-world example:** Creating a new note when user clicks "Add Note" button

---

### 2. **GET** - Retrieve Data from Server
**Purpose:** Fetch data from the server  
**What it does:** Retrieves stored data without modifying it

#### Code Reference
📁 File: `src/app.js` (Lines 19-25)

```javascript
//GET /notes // fatching data from server
app.get("/notes",(req,res)=>{
    res.status(200).json({
        message:"Note fatched succesfully",
        notes: notes
    })
})
```

**How to use:**
- **Endpoint:** `GET http://localhost:3000/notes`
- **Send Data:** No body needed (just the URL)
- **Response (Status 200 - OK):**
  ```json
  {
    "message": "Note fatched succesfully",
    "notes": [
      { "title": "My First Note", "des": "This is my first note" },
      { "title": "Second Note", "des": "Another note" }
    ]
  }
  ```
- **Real-world example:** Loading all notes when app opens or user navigates to notes list

---

### 3. **DELETE** - Remove Data from Server
**Purpose:** Delete existing data from the server  
**What it does:** Removes a specific note by its index

#### Code Reference
📁 File: `src/app.js` (Lines 27-35)

```javascript
//DELETE /notes/1 //deleting of any data from server 
app.delete("/notes/:index",(req,res)=>{
    const index=req.params.index /*if we call /notes/1 then index will be 1 , as we are using dynamic parameter "/:index"*/
    delete notes[index]
    res.status(200).json({
        message:"Note deleted succesfully",
        notes: notes
    })
})
```

**How to use:**
- **Endpoint:** `DELETE http://localhost:3000/notes/1`
  - `:index` is a **dynamic parameter** (placeholder for the note number)
  - If you call `/notes/1`, the index will be `1`
  - If you call `/notes/5`, the index will be `5`
- **Send Data:** No body needed
- **Response (Status 200 - OK):**
  ```json
  {
    "message": "Note deleted succesfully",
    "notes": [
      { "title": "Second Note", "des": "Another note" }
    ]
  }
  ```
- **Real-world example:** User clicks delete button → deletes the note at that position

---

### 4. **PATCH** - Update/Modify Data on Server
**Purpose:** Update existing data on the server  
**What it does:** Modifies a specific note by its index (updates only the description)

#### Code Reference
📁 File: `src/app.js` (Lines 37-48)

```javascript
//PATCH /notes/1 //Updating data in server
app.patch("/notes/:index",(req,res)=>{
    const index=req.params.index
    const des=req.body.des

    notes[index].des=des

    res.status(200).json({
        message:"Note updated succesfully"
    })
})
```

**How to use:**
- **Endpoint:** `PATCH http://localhost:3000/notes/0`
  - `:index` is a **dynamic parameter** - use the position of the note you want to update
- **Send Data (JSON):**
  ```json
  {
    "des": "Updated description for this note"
  }
  ```
- **Response (Status 200 - OK):**
  ```json
  {
    "message": "Note updated succesfully"
  }
  ```
- **Real-world example:** User edits a note → updates the description

---

## 📝 Note Data Structure

Each note follows this format:

```javascript
{
    "title": "note1",
    "des": "this is note 1"
}
```

- **title**: The heading/name of the note (string)
- **des**: The description/content of the note (string)

📁 Reference: `src/app.js` (Lines 6-10)

---

## 🚀 How to Run This Project

### Prerequisites
- Node.js installed on your computer
- npm (Node Package Manager)

### Setup Steps

1. **Navigate to the project folder:**
   ```bash
   cd "2- RESTAPI BASICS/NOTES_APP"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```
   or with nodemon (auto-reload on changes):
   ```bash
   npx nodemon server.js
   ```

4. **You should see:**
   ```
   Server is running on PORT 3000
   ```

📁 Reference: `server.js` (Lines 1-5)

---

## 🧪 Testing the API

You can test these endpoints using:
- **Postman** (GUI Tool) - Recommended for beginners ⭐
- **Thunder Client** (VS Code Extension)
- **cURL** (Command line)

---

## 📮 Testing with Postman (Complete Guide)

**Postman** is the easiest way to test APIs visually without writing code. Follow this step-by-step guide.

### Step 1: Download & Install Postman

1. Go to [https://www.postman.com/downloads/](https://www.postman.com/downloads/)
2. Download the version for your operating system (Windows, Mac, or Linux)
3. Install and open Postman
4. Create a free account or skip (both work fine)

### Step 2: Create a New Request

1. Click the **"+"** button or **"New"** button
2. Select **"HTTP Request"**
3. You now have a blank request ready

---

### Step 3: Test Each Endpoint

#### **TEST 1: Create a Note (POST Request)**

**Setup:**
1. In the URL bar, paste: `http://localhost:3000/notes`
2. Click the dropdown menu (currently shows "GET") and select **"POST"**
3. Click on the **"Body"** tab below the URL
4. Select **"raw"** option
5. From the dropdown on the right (shows "Text"), select **"JSON"**

**Send this data:**
```json
{
  "title": "My First Note",
  "des": "This is my first learning note"
}
```

**Click Send button and you should see:**
```json
{
  "message": "Note created successfully"
}
```

✅ Status: **201 Created** (appears in green at the top right)

---

#### **TEST 2: Get All Notes (GET Request)**

**Setup:**
1. In the URL bar, paste: `http://localhost:3000/notes`
2. The dropdown should already show **"GET"**
3. Click the **"Body"** tab - it will be empty (GET doesn't need a body)

**Click Send button and you should see:**
```json
{
  "message": "Note fatched succesfully",
  "notes": [
    {
      "title": "My First Note",
      "des": "This is my first learning note"
    }
  ]
}
```

✅ Status: **200 OK** (appears in green at the top right)

**💡 Tip:** Run this after creating notes to see all the notes you've created

---

#### **TEST 3: Update a Note (PATCH Request)**

**Setup:**
1. In the URL bar, paste: `http://localhost:3000/notes/0`
   - The `/0` means update the first note (index 0)
   - Use `/1` for second note, `/2` for third note, etc.
2. Click the dropdown and select **"PATCH"**
3. Click on the **"Body"** tab
4. Select **"raw"** and then **"JSON"**

**Send this data:**
```json
{
  "des": "Updated description - I learned about REST APIs!"
}
```

**Click Send button and you should see:**
```json
{
  "message": "Note updated succesfully"
}
```

✅ Status: **200 OK**

**To verify the update:** Run the GET request again to see the updated description

---

#### **TEST 4: Delete a Note (DELETE Request)**

**Setup:**
1. In the URL bar, paste: `http://localhost:3000/notes/0`
   - The `/0` means delete the first note
   - Use `/1` for second note, `/2` for third note, etc.
2. Click the dropdown and select **"DELETE"**
3. Click on the **"Body"** tab - it will be empty (DELETE doesn't need a body)

**Click Send button and you should see:**
```json
{
  "message": "Note deleted succesfully",
  "notes": []
}
```

✅ Status: **200 OK**

**To verify the deletion:** Run the GET request again to confirm the note is removed

---

### Step 4: Organize Requests in Postman (Optional but Recommended)

**Create a Collection to organize all your requests:**

1. Click **"Collections"** on the left sidebar
2. Click **"New Collection"**
3. Name it: `Notes App API`
4. Now you can save all your requests in one place

**Save each request to the collection:**
- After creating a request, click **"Save"** button
- Select **"Notes App API"** collection
- Give it a name like "Create Note", "Get All Notes", etc.

Now all your API requests are organized in one collection! 📚

---

### Quick Reference: Postman Request Setup

| Method | URL | Body | What It Does |
|--------|-----|------|--------------|
| **POST** | `http://localhost:3000/notes` | `{"title":"...", "des":"..."}` | Create a new note |
| **GET** | `http://localhost:3000/notes` | None | Get all notes |
| **PATCH** | `http://localhost:3000/notes/0` | `{"des":"..."}` | Update note at index 0 |
| **DELETE** | `http://localhost:3000/notes/0` | None | Delete note at index 0 |

---

### Common Postman Issues & Solutions

**❌ "Cannot GET /notes" or Connection Error**
- Make sure your server is running (`npm start` or `npx nodemon server.js`)
- Check that you're using `localhost:3000` (not 3001 or another port)

**❌ "Body tab is grayed out"**
- You're using GET or DELETE → Click away and back to enable the Body tab for future requests

**❌ "Response shows empty brackets []"**
- This is normal! It means all notes were deleted
- Create new notes with POST to populate the array

**❌ "Bad Request" or 400 Error**
- Make sure your JSON is valid (no missing commas or quotes)
- Make sure the Body is set to "raw" and "JSON"

---

### Tips for Testing Like a Pro

1. **Create multiple notes first** before testing DELETE and PATCH
2. **Keep the GET request open** in one tab to verify changes after each action
3. **Try different index numbers** to delete/update different notes (0, 1, 2, etc.)
4. **Copy request URLs** to test different note positions
5. **Check the response status codes:**
   - 🟢 **200** = Success (for GET, PATCH, DELETE)
   - 🟢 **201** = Created (for POST)
   - 🔴 **400-500** = Error

---

### Quick Test Examples (for reference)

**1. Create a Note (POST):**
```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Learning REST API","des":"Understanding CRUD operations"}'
```

**2. Get All Notes (GET):**
```bash
curl http://localhost:3000/notes
```

**3. Update a Note (PATCH):**
```bash
curl -X PATCH http://localhost:3000/notes/0 \
  -H "Content-Type: application/json" \
  -d '{"des":"Updated description"}'
```

**4. Delete a Note (DELETE):**
```bash
curl -X DELETE http://localhost:3000/notes/0
```

---

## 📂 Project Structure

```
NOTES_APP/
├── server.js          # Server entry point (starts the app on port 3000)
├── package.json       # Project dependencies
└── src/
    └── app.js         # All REST API routes and logic
```

---

## 🎓 Key Learning Points

| Concept | What We Learned |
|---------|-----------------|
| **HTTP Methods** | POST, GET, PATCH, DELETE and their purposes |
| **Status Codes** | 201 (Created), 200 (OK) |
| **Dynamic Routes** | Using `:index` parameter to identify specific resources |
| **Request Body** | Sending JSON data with POST and PATCH |
| **Response Format** | Returning JSON with messages and data |
| **Arrays in Server** | Storing data in memory (temporary, resets on restart) |

---

## 💡 Important Notes for Beginners

1. **Data is temporary:** When you restart the server, all notes are deleted (because they're stored in memory, not a database)
2. **Index-based:** Notes are accessed by their position in the array (0, 1, 2, etc.)
3. **JSON format:** Always send/receive data as JSON
4. **Status codes:** Different numbers indicate different outcomes (200=success, 201=created, etc.)

---

## 🔗 Connection Diagram

```
Client Request → Express Server → Notes Array → Response Back to Client
   (Postman)       (server.js)   (app.js)        (JSON format)
```

---

## 🎯 Next Steps After Learning

- Add a real database (MongoDB)
- Add more fields to notes (created date, updated date, etc.)
- Add authentication (login required to manage notes)
- Add validation (check if title/description are empty)
- Deploy the API online

---

**Happy Learning! 🚀**
