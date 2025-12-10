import { Request, Response, NextFunction } from "express";
import { supabase } from "../utils/supabase";

export async function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Missing authorization token" });
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data) return res.status(401).json({ error: "Unauthorized" });

  (req as any).user = data.user;
  next();
}
