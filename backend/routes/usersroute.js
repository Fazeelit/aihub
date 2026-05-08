import express from "express";
import {
  getAllUsers,
  LogIn,
  SignUp,
  deleteUser,
  resetPassword,
  updateUser,
  getUserById,
} from "../controllers/usersController.js";
import validateId from "../middleware/validateId.js";
import verifyToken, { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/login", LogIn);
router.post("/signup", SignUp);
router.put("/reset-password", resetPassword);
router.delete("/deleteUser/:id", verifyToken, verifyAdmin, validateId, deleteUser);
router.put("/updateUser/:id", verifyToken, validateId, updateUser);
router.get("/getUserById/:id", verifyToken, validateId, getUserById);

export default router;
