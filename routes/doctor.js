import  express  from "express";
import { updateDoctor,deleteDoctor,getsingleDoctor,allDoctors,getDoctorProfile } from "../Controllers/doctorController.js";
import { authenTicate,restrict } from "../auth/verifyToken.js";
import reviewRouter from "./review.js"
const router = express.Router();

//nested route
router.use("/:doctorId/reviews",reviewRouter)
router.get("/:id",getsingleDoctor)
router.get("/",allDoctors)
router.put("/:id",authenTicate,restrict(['doctor']),updateDoctor)
router.delete("/:id",authenTicate,restrict(['doctor']),deleteDoctor)

router.get("/profile/me",authenTicate,restrict(['doctor']),getDoctorProfile)

export default router;