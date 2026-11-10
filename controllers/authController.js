const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "raktdaan_secure_jwt_secret_token_2026";

// Secure registration controller with OWASP input validation and privilege escalation protection
const registerController = async (req, res) => {
  try {
    const { email, password, role, name, organisationName, hospitalName, address, phone, bloodGroup, city, pincode, website } = req.body;

    // 1. Enforce allowed roles (Block self-registration as "admin")
    const allowedRoles = ["donar", "hospital", "organisation"];
    if (!role || !allowedRoles.includes(role)) {
      return res.status(400).send({
        success: false,
        message: "Invalid role specified. Only donor, hospital, or organisation can register.",
      });
    }

    // 2. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).send({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // 3. Validate password strength (minimum 6 characters)
    if (!password || typeof password !== "string" || password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password must be at least 6 characters long.",
      });
    }

    // 4. Check existing user (case-insensitive email)
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await userModel.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "An account with this email already exists. Please log in.",
      });
    }

    // 5. Strong Password Hashing with bcrypt (10 rounds)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 6. Whitelisted fields only (Prevent Mass Assignment vulnerability)
    const userData = {
      role,
      email: normalizedEmail,
      password: hashedPassword,
      phone: (phone || "").trim(),
      address: (address || "").trim(),
      city: (city || "").trim(),
      pincode: (pincode || "").trim(),
      bloodGroup: (bloodGroup || "").trim(),
      website: (website || "").trim(),
    };

    if (role === "donar") userData.name = (name || "").trim();
    if (role === "hospital") userData.hospitalName = (hospitalName || name || "").trim();
    if (role === "organisation") userData.organisationName = (organisationName || name || "").trim();

    const user = new userModel(userData);
    await user.save();

    // 7. Prevent Information Disclosure: Never return password hash in response
    const safeUser = user.toObject();
    delete safeUser.password;

    return res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user: safeUser,
    });
  } catch (error) {
    console.error("Register API error:", error);
    return res.status(500).send({
      success: false,
      message: "Error during user registration",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal error",
    });
  }
};

// Secure login callback with generic error messaging to prevent User Enumeration
const loginController = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).send({
        success: false,
        message: "Email, password, and role are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await userModel.findOne({ email: normalizedEmail });

    // Generic error to prevent User Enumeration (OWASP A07)
    if (!user || user.role !== role) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials or unauthorized role",
      });
    }

    // Compare password with bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials or unauthorized role",
      });
    }

    // Generate JWT token with 1 day expiration
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // Remove password hash from response
    const safeUser = user.toObject();
    delete safeUser.password;

    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error("Login API error:", error);
    return res.status(500).send({
      success: false,
      message: "Error In Login API",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal error",
    });
  }
};

// GET CURRENT USER with password explicitly excluded
const currentUserController = async (req, res) => {
  try {
    const userId = req.body.userId || req.userId;
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    console.error("Current User API error:", error);
    return res.status(500).send({
      success: false,
      message: "Unable to get current user",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal error",
    });
  }
};

module.exports = { registerController, loginController, currentUserController };
