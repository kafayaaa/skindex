import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";

import healthRoute from "./routes/health.route";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// File upload (multer)
const upload = multer({ dest: "uploads/" });

// Routes
app.use("/health", healthRoute);

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
