import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import otpRoutes from "./routes/otpRoutes.js";

dotenv.config();
const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // allow React frontend
app.use(express.json());

// Routes
app.use("/api/otp", otpRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
