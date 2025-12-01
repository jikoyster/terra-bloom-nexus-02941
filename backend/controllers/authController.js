// backend/controllers/authController.js
const crypto = require("crypto");
const { Authentication } = require("../models");

// REGISTER
exports.createUser = async (req, res) => {
  const { username, password, full_name, email, phone } = req.body;

  if (!username || !password || !full_name || !phone) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const hashedPassword = crypto.createHash("sha1").update(password).digest("hex");

    const newUser = await Authentication.create({
      username,
      password: hashedPassword,
      full_name,
      email,
      phone,
      created_at: new Date(),
      last_sign_in_at: null,
    });

    res.json({ success: true, message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error("Create user error:", err);
    res.status(500).json({ success: false, error: "Failed to create user" });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password required" });
  }

  try {
    const hashedPassword = crypto.createHash("sha1").update(password).digest("hex");
    console.log("Login attempt:", username, "Hashed password:", hashedPassword);

    const user = await Authentication.findOne({
      where: { username, password: hashedPassword },
    });

    if (!user) {
      console.log("Invalid login for user:", username);
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }

    user.last_sign_in_at = new Date();
    await user.save();

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, error: "Login failed" });
  }
};
