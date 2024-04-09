import { Router } from "express";
import postController from "../controller/postController.js";
import multer from "multer";
const router = Router();
const upload = multer({ dest: "uploads" });
router
  .route("/")
  .get(postController.getPost)
  .post(upload.single("file"), postController.createPost);
router
  .route("/:id")
  .get(postController.getArticle)
  .put(upload.single("file"), postController.editPost)
  .delete(postController.deletePost);
export default router;
