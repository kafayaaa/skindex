// src/utils/multer.ts
import multer from "multer";
import path from "path";

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       Date.now() +
//         "-" +
//         Math.round(Math.random() * 1e9) +
//         path.extname(file.originalname)
//     );
//   },
// });

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Hanya file JPEG dan PNG yang diizinkan"));
    }
  },
});

export default upload;
