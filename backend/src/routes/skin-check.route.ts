import { Router } from "express";
import upload from "../utils/multer";
import { SkinCheckController } from "../controllers/skin-check.controller";

const router = Router();

router.post("/upload", upload.single("photo"), SkinCheckController.analyze);

export default router;
