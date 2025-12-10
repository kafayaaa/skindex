import { Request, Response } from "express";

export const healthCheck = (req: Request, res: Response) => {
  return res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
};

export const protectedRoute = (req: Request, res: Response) => {
  return res.json({
    message: "Protected route accessed",
    user: (req as any).user,
  });
};
