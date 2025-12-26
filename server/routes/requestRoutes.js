import express from "express";
import Request from "../models/Request.js";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

// POST - add request + send email
router.post("/requests", async (req, res) => {
  try {
    const {
      name,
      email,
      websiteType,
      budget,
      message,
      templateInterested
    } = req.body;

    if (!name || !email || !websiteType || !budget) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newRequest = new Request({
      name,
      email,
      websiteType,
      budget,
      message,
      templateInterested,
    });

    await newRequest.save();

    // OPTIONAL: Email (wrap separately)
    try {
      await sendEmail({
        name,
        email,
        websiteType,
        budget,
        message,
        templateInterested,
      });
    } catch (emailErr) {
      console.error("Email failed:", emailErr.message);
    }

    res.status(201).json({ message: "Request submitted successfully" });

  } catch (err) {
    console.error("Request API error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// GET - admin fetch requests
router.get("/", async (req, res) => {
  const data = await Request.find().sort({ createdAt: -1 });
  res.json(data);
});

export default router;
