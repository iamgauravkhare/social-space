import { Router } from "express";
import authController from "../controller/authController.js";
const router = Router();

router.route("/").post(authController.authUser);

export default router;
