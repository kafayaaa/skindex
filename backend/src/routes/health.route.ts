import { Router } from "express";
import { healthCheck, protectedRoute } from "../controllers/health.controller";
import { auth } from "../middleware/auth";

const router = Router();

router.get("/", healthCheck);
router.get("/protected", auth, protectedRoute);

export default router;
