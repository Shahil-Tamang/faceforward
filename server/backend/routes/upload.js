import express from "express";
import multer from "multer";
import path from "path";
import Image from "../models/image.js";

const router = express.Router();

//  Correct absolute upload path
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "backend/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// POST image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const image = new Image({
      filename: req.file.filename,
      path: `backend/uploads/${req.file.filename}`,
    });

    await image.save();

    res.status(201).json({
      message: "Image uploaded & saved in images collection",
      image,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Image upload failed" });
  }
});

export default router;
