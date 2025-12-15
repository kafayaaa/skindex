import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import multer from "multer";
import healthRoute from "./routes/health.route";
import skinCheckRoute from "./routes/skin-check.route";
import skinRouter from "./routes/skin.route";

const app = express();
app.use(cors());
app.use(express.json());

// File upload (multer)
const upload = multer({ dest: "uploads/" });

// Routes
app.use("/health", healthRoute);
app.use("/api/skin-check", skinCheckRoute);
app.use("/api/skin", skinRouter);

// Example endpoint using multer
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  return res.json({
    message: "Upload success",
    file: req.file,
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
