import express from "express";
import {
  updateUser,
  deleteUser,
  getsingleUser,
  allUsers,
  getUserProfile,
  getMyAppointments,
} from "../Controllers/userController.js";
import { authenTicate, restrict } from "../auth/verifyToken.js";
const router = express.Router();

router.get("/:id", authenTicate, restrict(["patient"]), getsingleUser);
router.get("/", authenTicate, restrict(["admin"]), allUsers);
router.put("/:id", authenTicate, restrict(["patient"]), updateUser);
router.delete("/:id", authenTicate, restrict(["patient"]), deleteUser);
router.get("/profile/me", authenTicate, restrict(["patient"]), getUserProfile);
router.get("/appointments/my-appointments", authenTicate, restrict(["patient"]), getMyAppointments);

export default router;
