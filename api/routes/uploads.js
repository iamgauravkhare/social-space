import { Router } from "express";
import uploadController from "../controller/uploadController.js";

const router = Router();

router.route("/:image").get(uploadController.getImage);

export default router;
