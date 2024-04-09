import { Router } from "express";
import profileController from "../controller/profileController.js";

const router = Router();

router.route("/").get(profileController.getUser);

export default router;
