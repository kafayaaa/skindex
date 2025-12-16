import { Router } from "express";
import { getSkinInsight } from "../controllers/skinInsight.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", requireAuth, getSkinInsight);

export default router;
