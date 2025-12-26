import express from "express";
import Request from "../models/Request.js";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

// POST - add request + send email
router.post("/", async (req, res) => {
  try {
    const { name, email, templateName, budget, message } = req.body;

    const newRequest = new Request({
      name,
      email,
      templateName,
      budget,
      message,
    });

    await newRequest.save();

    // Send email to admin
    await sendEmail({
      subject: "📩 New Website Customization Request",
      html: `
        <h2>New Customization Request</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Template:</b> ${templateName}</p>
        <p><b>Budget:</b> ${budget}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    res.json({ message: "Request submitted & email sent" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ message: "Request saved but email failed" });
  }
});

// GET - admin fetch requests
router.get("/", async (req, res) => {
  const data = await Request.find().sort({ createdAt: -1 });
  res.json(data);
});

export default router;
