import authRoutes from "./routes/authRoutes.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config';
import templateRoutes from "./routes/templateRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";

const app = express();          // ✅ FIRST create app

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
   allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/templates", templateRoutes);
app.use("/auth", authRoutes);
app.use("/requests", requestRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API Running");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

