import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {
  console.log("LOGIN ROUTE HIT", req.body.email);
  console.log("ENV ADMIN EMAIL:", process.env.ADMIN_EMAIL);
  console.log("ENV ADMIN PASSWORD:", process.env.ADMIN_PASSWORD);

  const { email, password } = req.body;
   
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

export default router;
