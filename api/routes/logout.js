import { Router } from "express";
import logoutController from "./../controller/logoutController.js";
const router = Router();

router.route("/").post(logoutController.logout);

export default router;
