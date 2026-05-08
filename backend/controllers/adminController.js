import Admin from "../model/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// Helper: Validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// ======================= GET ALL ADMINS ===========================
const getAllAdmin = async (req, res) => {
  try {
    const admins = await Admin.find();

    if (!admins || admins.length === 0) {
      return res.status(404).json({ message: "Admins not found" });
    }

    return res.status(200).json({
      message: "Admins fetched successfully",
      admins,
    });
  } catch (error) {
    console.error("❌ Error fetching admins:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ======================= ADMIN LOGIN ===========================
const LogInAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || typeof email !== "string")
      return res.status(400).json({ message: "Email is required and must be a string" });

    if (!password || typeof password !== "string")
      return res.status(400).json({ message: "Password is required and must be a string" });

    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    // Generate Token
    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE_IN || "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      data: {
        token,
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
          createdAt: admin.createdAt,
          status: admin.status,
          profilePicture: admin.profilePicture,
        },
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ======================= ADMIN SIGN UP ===========================
const SignUpAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || typeof username !== "string")
      return res.status(400).json({ message: "Username is required" });

    if (!email || typeof email !== "string")
      return res.status(400).json({ message: "Email is required" });

    if (!password || typeof password !== "string")
      return res.status(400).json({ message: "Password is required" });

    if (await Admin.findOne({ email }))
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
      role: "admin",
      status: "registered",
      createdAt: Date.now(),
      profilePicture: "default.jpg",
    });

    await newAdmin.save();
    return res.status(201).json({ message: "Admin created successfully", data: newAdmin });
  } catch (error) {
    console.error("❌ SignUp Error:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ======================= RESET ADMIN PASSWORD ===========================
const resetPassworddAdmin = async (req, res) => {
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
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found with this email" });
    }

    // Verify old password (optional, only if user remembers it)
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    // Check if new password is different from old password
    const isSamePassword = await bcrypt.compare(newPassword, admin.password);
    if (isSamePassword) {
      return res.status(400).json({ message: "New password must be different from the old password" });
    }

    // Hash and update the new password
    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ======================= UPDATE ADMIN ===========================
const updateAdmin = async (req, res) => {
  try {
    const { username, email, status } = req.body;

    const updates = {};
    if (username) updates.username = username;
    if (email) updates.email = email;
    if (status) updates.status = status;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const admin = await Admin.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    return res.status(200).json({ admin });
  } catch (error) {
    console.error("❌ Error updating admin:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// ======================= DELETE ADMIN ===========================
const deleteAdminById = async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);

    if (!deletedAdmin)
      return res.status(404).json({ message: "Admin not found" });

    return res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting admin:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ======================= GET ADMIN BY ID ===========================

const getAdminById = async (req, res) => {
  try {
    const adminId = req.params.id;

    // Validate ObjectId (optional)
    if (!adminId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid admin ID" });
    }

    const admin = await Admin.findById(adminId).select("-password");
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    res.status(200).json({ success: true, message: "Admin fetched successfully", data: admin });
  } catch (error) {
    console.error("Error in getAdminById:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export {
  getAllAdmin,
  getAdminById,
  SignUpAdmin,
  LogInAdmin,
  updateAdmin,
  deleteAdminById,
  resetPassworddAdmin,
};
