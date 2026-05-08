import express from "express";
import verifyToken, { verifyAdmin } from "../middleware/auth.js";
import {
  getAllAdmin,
  getAdminById,
  SignUpAdmin,
  LogInAdmin,
  updateAdmin,
  deleteAdminById,
  resetPassworddAdmin
} from "../controllers/adminController.js";

const router = express.Router();

// Public routes
router.post("/signupAdmin", SignUpAdmin);
router.post("/loginAdmin", LogInAdmin);
router.put("/resetPasswordAdmin", resetPassworddAdmin);
// Protected routes (admin only)
router.get("/", verifyToken, verifyAdmin, getAllAdmin);
router.get("/getAdminById/:id", verifyToken, verifyAdmin, getAdminById);
router.put("/updateAdmin/:id", verifyToken, verifyAdmin, updateAdmin);
router.delete("/deleteAdmin/:id", verifyToken, verifyAdmin, deleteAdminById);
 // only for logged-in admin

export default router;
