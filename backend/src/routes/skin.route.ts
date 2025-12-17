import { Router } from "express";
import { analyzeSkin, getSkinLogByDate } from "../controllers/skin.controller";
import upload from "../utils/multer";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/analyze", requireAuth, upload.single("photo"), analyzeSkin);
router.get("/logs/by-date", requireAuth, getSkinLogByDate);

export default router;
