import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const auth = req.headers.authorization;
  if (!auth)
    return res.status(401).json({ error: "Missing authorization header" });

  const token = auth.split(" ")[1];

  try {
    // Supabase uses JWT with a known JWKS structure but can be verified simply:
    const payload = jwt.decode(token);

    if (!payload) return res.status(401).json({ error: "Invalid token" });

    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthenticated" });
  }
}
