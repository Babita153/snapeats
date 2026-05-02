import express from "express";
const router = express.Router();

// Example routes
router.post("/login", (req, res) => {
  res.send("Login route");
});

router.post("/signup", (req, res) => {
  res.send("Signup route");
});

// ✅ THIS LINE IS IMPORTANT
export default router;