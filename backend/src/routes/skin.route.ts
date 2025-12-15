import { Router } from "express";
import { analyzeSkin } from "../controllers/skin.controller";
import upload from "../utils/multer";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/analyze", requireAuth, upload.single("photo"), analyzeSkin);

export default router;
