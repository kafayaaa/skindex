import { Router } from "express";
import { healthCheck, protectedRoute } from "../controllers/health.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", healthCheck);
router.get("/protected", requireAuth, protectedRoute);

export default router;
