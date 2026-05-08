import User from "../model/usersModel.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Helper: Validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
const buildUserToken = (user) =>
  jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE_IN || "7d" }
  );

// ======================= GET ALL USERS ===========================
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) return res.status(404).json({ message: "Users not found" });

    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    console.error("❌ Error fetching users:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ======================= LOGIN ===========================
const LogIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || typeof email !== "string")
    return res.status(400).json({ message: "Email is required and must be a string" });

  if (!password || typeof password !== "string")
    return res.status(400).json({ message: "Password is required and must be a string" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    // ------------------- LOGIN ACTIVITY TRACKING -------------------
    user.lastLogin = new Date();
    user.loginIPs = user.loginIPs || [];
    user.loginDevices = user.loginDevices || [];

    // Optional: Keep only last 5 IPs/devices
    user.loginIPs.push(req.ip);
    if (user.loginIPs.length > 5) user.loginIPs.shift();

    user.loginDevices.push(req.headers["user-agent"]);
    if (user.loginDevices.length > 5) user.loginDevices.shift();

    await user.save();
    // ------------------- END LOGIN ACTIVITY -------------------

    const token = buildUserToken(user);

    res.status(200).json({
      message: "User logged in successfully",
      data: {
        token,
        user: user.toSafeObject(),
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ======================= SIGN UP ===========================
const SignUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || typeof username !== "string")
    return res.status(400).json({ message: "Username is required and must be a string" });
  if (!email || typeof email !== "string")
    return res.status(400).json({ message: "Email is required and must be a string" });
  if (!password || typeof password !== "string")
    return res.status(400).json({ message: "Password is required and must be a string" });

  try {
    const normalizedUsername = username.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (await User.findOne({ username: normalizedUsername })) {
      return res.status(400).json({ message: "Username already exists" });
    }

    if (await User.findOne({ email: normalizedEmail })) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({
      username: normalizedUsername,
      email: normalizedEmail,
      password,
      role: "user",
      createdAt: Date.now(),
      status: "registered",
      profilePicture: "default.jpg",
    });

    await newUser.save();
    const token = buildUserToken(newUser);

    res.status(201).json({
      message: "User created successfully",
      data: {
        token,
        user: newUser.toSafeObject(),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ======================= RESET PASSWORD ===========================
const resetPassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;

    // Validate input
    if (!email || typeof email !== "string") {
      return res.status(400).json({ message: "Email is required and must be a string" });
    }
    if (!oldPassword || typeof oldPassword !== "string") {
      return res.status(400).json({ message: "Old password is required and must be a string" });
    }
    if (!newPassword || typeof newPassword !== "string") {
      return res.status(400).json({ message: "New password is required and must be a string" });
    }
    if (!confirmPassword || typeof confirmPassword !== "string") {
      return res.status(400).json({ message: "Confirm password is required and must be a string" });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New password and confirm password do not match" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found with this email" });
    }

    // Verify old password (optional, only if user remembers it)
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    // Check if new password is different from old password
    const isSamePassword = await user.comparePassword(newPassword);
    if (isSamePassword) {
      return res.status(400).json({ message: "New password must be different from the old password" });
    }

    // Hashing is handled in the user schema.
    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ======================= DELETE USER ===========================
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting user:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ======================= UPDATE USER ===========================
 const updateUser = async (req, res) => {
  try {
    const { username, email, status, password } = req.body;

    // Collect only fields that are present
    const updates = {};
    if (username) updates.username = username;
    if (email) updates.email = email;
    if (status) updates.status = status;    

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate ObjectId
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(userId).select("-password"); // exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export { getAllUsers, SignUp, LogIn, deleteUser, resetPassword, updateUser, getUserById };
