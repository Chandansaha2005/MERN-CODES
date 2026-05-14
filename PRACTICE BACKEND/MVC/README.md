# MVC Architecture - Complete Authentication App

This project demonstrates the **MVC (Model-View-Controller)** architectural pattern applied to a full-stack application. It builds on the database and REST API basics from previous folders while introducing proper code organization, authentication, and image uploads.

---

## 🏗️ What is MVC Architecture?

**MVC** separates your application into three independent layers:

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND (View)                   │
│              React - User Interface                  │
│         (What users see and interact with)           │
└─────────────────────────────────────────────────────┘
                          ↕
                   (Data & Requests)
                          ↕
┌─────────────────────────────────────────────────────┐
│              BACKEND (Model + Controller)             │
├─────────────────────────────────────────────────────┤
│ Controller (authController.js)                       │
│ - Handles requests from frontend                    │
│ - Calls appropriate Model functions                 │
│ - Sends responses back                              │
│          ↕                              ↕            │
│ Router          (Directs requests)   Middleware    │
│ (auth.js)       to Controllers        (upload.js)  │
│          ↕                                           │
│ Model (User.js)                                     │
│ - Defines data structure                            │
│ - Database interactions                             │
│          ↕                                           │
└─────────────────────────────────────────────────────┘
                          ↕
                    Database (MongoDB)
```

### Why MVC?

| Benefit                    | Explanation                                      |
| -------------------------- | ------------------------------------------------ |
| **Separation of Concerns** | Each layer has a single responsibility           |
| **Maintainability**        | Easy to locate and fix bugs                      |
| **Scalability**            | Easy to add new features                         |
| **Reusability**            | Components can be reused                         |
| **Team Work**              | Multiple developers can work on different layers |

---

## 📂 MVC Folder Structure

```
Backend/
├── Server.js              # Entry point - starts server & connects routes
├── package.json           # Dependencies (express, mongoose, bcryptjs, jwt, etc.)
├── .env                   # Environment variables (secrets, URLs)
│
├── config/
│   ├── db.js             # MongoDB connection setup
│   └── Cloudinary.js     # Image upload service setup
│
├── routes/
│   └── auth.js           # Route definitions (directs requests to controllers)
│
├── controllers/
│   └── authController.js # Business logic (register, login, fetch users)
│
├── models/
│   └── User.js           # Data schema (defines user structure)
│
├── middleware/
│   └── upload.js         # File upload handling (multer configuration)
│
└── uploads/              # Temporary image storage

Frontend/
└── myproject/            # React application
    └── src/
        ├── components/
        ├── pages/
        └── App.js        # Main React component
```

**Key Point:** Backend handles DATA & LOGIC → Frontend displays DATA & collects INPUT

---

## 🔄 MVC Components Explained

### 1. **MODEL** - Data Structure

📁 File: [Backend/models/User.js](Backend/models/User.js)

```javascript
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.model("User", userSchema);
```

**What it does:**

- Defines the **structure** of user data
- Enforces that name, email, password are required
- Email must be unique (no duplicates)
- No business logic here, just structure

**Example Document:**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2a$10$hashofpasswordhere",
  "image": "https://res.cloudinary.com/cloud/image/upload/v123/users/image.jpg"
}
```

---

### 2. **CONTROLLER** - Business Logic

📁 File: [Backend/controllers/authController.js](Backend/controllers/authController.js)

Controllers handle the **logic** of your application. They:

1. Receive requests from routes
2. Process the data
3. Interact with models
4. Send responses

#### Controller Function 1: REGISTER

```javascript
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body; // Get data from request
    const imagePath = req.file.path; // Get uploaded image path

    // Upload image to Cloudinary (external service)
    const cloudResult = await cloudinary.uploader.upload(imagePath, {
      folder: "users",
    });

    // Delete local temporary file
    fs.unlinkSync(imagePath);

    // Hash password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user document
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image: cloudResult.secure_url,
    });

    // Save to database
    await newUser.save();

    // Send success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
```

**Step-by-step:**

1. Extract name, email, password, and image from request
2. Upload image to Cloudinary (not store locally)
3. Hash password using bcryptjs (for security)
4. Create new User using the Model
5. Save to MongoDB database
6. Return success message

#### Controller Function 2: LOGIN

```javascript
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    // Compare provided password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    // Create JWT token (session token)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
```

**What's happening:**

1. Find user in database by email
2. Compare password (encrypted check)
3. If match, create JWT token (digital passport)
4. Send token to frontend (frontend stores and uses for future requests)

#### Controller Function 3: FETCH USERS

```javascript
export const fetch_detail = async (req, res) => {
  try {
    const users = await User.find(); // Get all users
    res.json({ data: users });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
```

**What it does:**

- Retrieves all users from database
- Returns them to frontend

---

### 3. **ROUTES** - Request Router

📁 File: [Backend/routes/auth.js](Backend/routes/auth.js)

Routes are like **traffic directors** - they direct incoming requests to the right controller:

```javascript
import express from "express";
import upload from "../middleware/upload.js";
import {
  register,
  login,
  fetch_detail,
} from "../controllers/authController.js";

const router = express.Router();

// When POST request comes to /register, use upload middleware, then call register controller
router.post("/register", upload.single("image"), register);

// When POST request comes to /login, call login controller
router.post("/login", login);

// When POST request comes to /fetch_detail, call fetch_detail controller
router.post("/fetch_detail", fetch_detail);

export default router;
```

**How it works:**

```
Frontend sends POST to /api/auth/register
         ↓
Route matches: router.post('/register', ...)
         ↓
Middleware 'upload' processes image file
         ↓
Controller 'register' function executes
         ↓
Response sent back to frontend
```

---

### 4. **MIDDLEWARE** - Request Interceptor

📁 File: [Backend/middleware/upload.js](Backend/middleware/upload.js)

**Middleware** is code that runs BEFORE the controller - it processes requests.

```javascript
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb("Only image files are allowed", false);
};

const upload = multer({ storage, fileFilter });

export default upload;
```

**What it does:**

1. **Storage**: Saves uploaded files with unique names (prevents conflicts)
2. **FileFilter**: Only allows image files (blocks `.exe`, `.txt`, etc.)
3. **Used in routes**: `upload.single('image')` processes one image before controller runs

**Middleware Flow:**

```
Request with file
     ↓
upload middleware checks: "Is this an image?"
     ↓
If YES: Save to disk, add to req.file, continue to controller
If NO: Return error, don't reach controller
```

---

## 🔐 New Security Features

### 1. **Password Hashing with bcryptjs**

```javascript
// During registration
const hashedPassword = await bcrypt.hash(password, 10);
// password: "mypassword123"
// becomes: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36EmYvFm"

// During login
const isMatch = await bcrypt.compare(password, hashedPassword);
// Compares: "mypassword123" with "$2a$10$..."
// Returns: true or false
```

**Why hash?**

- Never store actual passwords (security risk)
- Only store hashed versions
- Can't reverse the hash to get original password
- Each hash is unique (even same password produces different hash)

### 2. **JWT Tokens**

```javascript
const token = jwt.sign(
  { id: user._id }, // Data to encode
  process.env.JWT_SECRET, // Secret key
  { expiresIn: "1d" }, // Expires in 1 day
);

// Generated token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// Frontend stores this token
// Frontend sends token with every request:
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**What JWT does:**

- Proves user is logged in
- Contains user ID
- Expires after 1 day
- Can't be forged (requires secret key)

---

## 🖼️ Image Upload with Cloudinary

Instead of storing images on your server (takes disk space), we upload to **Cloudinary** (external image hosting):

```
User uploads image
         ↓
Multer saves temporarily to /uploads
         ↓
Controller sends to Cloudinary
         ↓
Cloudinary returns secure URL
         ↓
Delete local file
         ↓
Save URL to database
```

**Example:**

```javascript
const cloudResult = await cloudinary.uploader.upload(imagePath, {
  folder: "users", // Organize in 'users' folder
});

// cloudResult.secure_url:
// "https://res.cloudinary.com/mycloud/image/upload/v1234/users/abc123.jpg"

// This URL is what gets saved to database
```

**Benefits:**

- ✅ Saves server disk space
- ✅ Images are fast (CDN delivery)
- ✅ Automatic optimization
- ✅ Easy to delete later

---

## ⚙️ Configuration Files

### Environment Variables (.env)

```env
# MongoDB
MONGO_URL=mongodb://localhost:27017/mvc-app

# JWT
JWT_SECRET=your_secret_key_here_change_in_production

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

📁 File: [Backend/config/db.js](Backend/config/db.js)

```javascript
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
```

📁 File: [Backend/config/Cloudinary.js](Backend/config/Cloudinary.js)

```javascript
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
```

---

## 🚀 Server Entry Point

📁 File: [Backend/Server.js](Backend/Server.js)

```javascript
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";

dotenv.config(); // Load .env variables
const app = express();

app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api/auth", authRoutes); // Routes under /api/auth prefix

// DB connection
connectDB(); // Connect to MongoDB

// Server start
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

**Flow:**

1. Load environment variables
2. Create Express app
3. Enable CORS (frontend can make requests)
4. Parse incoming JSON
5. Connect all routes
6. Connect to database
7. Start server on port 8000

---

## 🎨 Frontend Integration

📁 Folder: [Frontend/myproject/src/](Frontend/myproject/src/)

The **Frontend** (React app) handles:

- **View**: What users see
- **User Input**: Forms, buttons, clicks
- **Display Data**: Show user profiles, uploaded images
- **Communication**: Send data to backend APIs

**Example Frontend Flow:**

```javascript
// User fills registration form
// Frontend sends POST request to backend:
const response = await fetch("http://localhost:8000/api/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "John Doe",
    email: "john@example.com",
    password: "secure123",
    // image file handled by FormData
  }),
});

// Backend processes and responds
// Frontend receives response and updates UI
```

---

## 📋 API Endpoints Reference

| Method | Endpoint                 | Purpose         | Body                             |
| ------ | ------------------------ | --------------- | -------------------------------- |
| POST   | `/api/auth/register`     | Create new user | `{name, email, password, image}` |
| POST   | `/api/auth/login`        | User login      | `{email, password}`              |
| POST   | `/api/auth/fetch_detail` | Get all users   | None                             |

---

## 🧪 Complete Testing Workflow

### TEST 1: Register a New User (POST)

**Postman Setup:**

1. Method: **POST**
2. URL: `http://localhost:8000/api/auth/register`
3. Headers: Set automatically for form-data
4. Body: Select **form-data**

**Fill in:**

- Key: `name` → Value: `John Doe`
- Key: `email` → Value: `john@example.com`
- Key: `password` → Value: `securepass123`
- Key: `image` → Select: Choose an image file

**Expected Response (201):**

```json
{
  "message": "User registered successfully"
}
```

✅ **Verify:**

- Check MongoDB: User saved with hashed password
- Check Cloudinary: Image uploaded and URL stored

---

### TEST 2: Login (POST)

**Postman Setup:**

1. Method: **POST**
2. URL: `http://localhost:8000/api/auth/login`
3. Body: **raw** → **JSON**

**Send:**

```json
{
  "email": "john@example.com",
  "password": "securepass123"
}
```

**Expected Response (201):**

```json
{
  "message": "Success"
}
```

⚠️ **Note:** Token generation is configured but response is simplified in the code

---

### TEST 3: Fetch All Users (POST)

**Postman Setup:**

1. Method: **POST**
2. URL: `http://localhost:8000/api/auth/fetch_detail`
3. Body: Not needed

**Expected Response (200):**

```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "password": "$2a$10$hashedpassword...",
      "image": "https://res.cloudinary.com/..."
    }
  ]
}
```

---

## 📊 Data Flow Diagram

```
FRONTEND (React)
├─ User fills registration form
├─ User selects profile image
└─ Clicks "Register" button
        ↓
BACKEND REQUEST
├─ POST /api/auth/register with form data
├─ Headers include Content-Type: multipart/form-data
└─ Body includes name, email, password, image file
        ↓
SERVER (Express)
├─ Route router.post('/register', ...) matches
├─ Middleware: upload.single('image') runs
│  ├─ Validates it's an image
│  └─ Saves to disk with unique name
└─ Continues to next step
        ↓
CONTROLLER (authController.register)
├─ Extract: name, email, password, imagePath
├─ Upload image to Cloudinary
├─ Receive: secure_url from Cloudinary
├─ Hash password with bcryptjs
├─ Create User document with hashed password + image URL
└─ Save to database
        ↓
MODEL (User.js)
├─ Validates data against schema
├─ Saves to MongoDB collection
└─ Returns success
        ↓
RESPONSE
├─ Status: 201 Created
├─ Body: { message: "User registered successfully" }
└─ Sent back to Frontend
        ↓
FRONTEND UPDATES
├─ Shows success message
├─ Redirects to login page
└─ User can now log in
```

---

## 🎯 Key Concepts Summary

| Concept         | Purpose                             | Location                        |
| --------------- | ----------------------------------- | ------------------------------- |
| **Model**       | Data structure & schema             | `models/User.js`                |
| **Controller**  | Business logic & data processing    | `controllers/authController.js` |
| **Routes**      | URL → Controller mapping            | `routes/auth.js`                |
| **Middleware**  | Pre-process requests (image upload) | `middleware/upload.js`          |
| **Config**      | External service setup              | `config/` folder                |
| **Async/Await** | Handle time-taking operations       | Throughout (not new, but used)  |
| **bcryptjs**    | Password hashing for security       | `authController.js`             |
| **JWT**         | Session tokens for authentication   | `authController.js`             |
| **Cloudinary**  | Image hosting service               | `authController.js`             |
| **Multer**      | File upload handling                | `middleware/upload.js`          |

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB running
- Cloudinary account (free at [https://cloudinary.com/](https://cloudinary.com/))

### Step 1: Install Dependencies

```bash
cd Backend
npm install
```

### Step 2: Create .env File

```bash
# In Backend folder, create .env file with:
MONGO_URL=mongodb://localhost:27017/mvc-app
JWT_SECRET=your_super_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Step 3: Start Backend Server

```bash
npm start
# or with nodemon:
npx nodemon Server.js
```

**Expected:**

```
MongoDB connected
Server running on http://localhost:8000
```

### Step 4: Start Frontend

```bash
cd Frontend/myproject
npm install
npm start
```

**Frontend will open at:** `http://localhost:3000`

---

## 🔗 Connection: Backend + Frontend

**Backend (Node.js + Express)** runs on `http://localhost:8000`

- Provides APIs
- Manages database
- Handles authentication

**Frontend (React)** runs on `http://localhost:3000`

- Displays UI
- Sends requests to backend
- Shows responses to users

They communicate via **HTTP requests** (fetch or axios)

---

## 💡 NEW Concepts in MVC (vs Previous Folders)

| Concept                   | Introduced Here   | Used For                       |
| ------------------------- | ----------------- | ------------------------------ |
| **Controllers**           | Yes               | Organizing business logic      |
| **Middleware**            | Yes               | Pre-processing requests        |
| **Routes**                | Yes (more formal) | Mapping URLs to functions      |
| **Authentication**        | Yes               | User login/registration        |
| **Password Hashing**      | Yes               | Security                       |
| **JWT Tokens**            | Yes               | Session management             |
| **File Upload**           | Yes               | Image handling                 |
| **Cloudinary**            | Yes               | External image service         |
| **CORS**                  | Yes               | Frontend-Backend communication |
| **Environment Variables** | Yes               | Config management              |

---

## 🚀 Next Steps

After mastering MVC:

1. **Add Token Verification**: Create middleware to verify JWT tokens
2. **Add Protected Routes**: Only authenticated users can access
3. **Add Data Validation**: Validate email format, password strength
4. **Add Error Handling**: Better error messages
5. **Add Logging**: Track what happens in your app
6. **Deploy to Cloud**: Use Heroku, Vercel, or Railway

---

## 🆘 Troubleshooting

**❌ "Cannot upload image"**

- Check Cloudinary credentials in .env
- Ensure multer middleware is correctly set up

**❌ "Mongoose connection failed"**

- Ensure MongoDB is running
- Check MONGO_URL in .env

**❌ "CORS error from frontend"**

- Backend must have `app.use(cors());`
- Verify frontend and backend URLs

**❌ "JWT secret not found"**

- Create .env file in Backend folder
- Add JWT_SECRET value

---

## 📚 Architecture Benefits in This Project

```
Before (Simple REST API):
- All logic in one file (app.js)
- Hard to maintain
- Hard to add features

After (MVC):
- Controller: Register, Login logic
- Model: User structure
- Routes: URL mapping
- Middleware: Image handling
- Config: Database & Cloudinary setup
- Organized & Scalable!
```

---

**Congratulations! You've learned MVC Architecture! 🎓🏆**

This is the foundation for professional backend development. The next step is adding real-world features like permissions, validation, and production deployment!
