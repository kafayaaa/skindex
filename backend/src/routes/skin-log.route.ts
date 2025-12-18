import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { createSkinLog } from "../controllers/skin-log.controller";

const router = Router();

router.post("/", requireAuth, createSkinLog);

export default router;
