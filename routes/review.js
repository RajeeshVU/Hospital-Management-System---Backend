import  express  from "express";
import { getAllreviews,createReviews } from "../Controllers/reviewController.js";
import { authenTicate, restrict } from "../auth/verifyToken.js";

const router = express.Router({mergeParams:true});
//doctor/doctorid/reviews
router.route("/")
.get(getAllreviews)
.post(authenTicate,restrict(["patient"]),createReviews)


export default router;