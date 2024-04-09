import { Router } from "express";
import registerController from "../controller/registerController.js";
const router = Router();

router.route("/").post(registerController.createUser);

export default router;
