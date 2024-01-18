// Handle resume uploads using Multer

import multer from "multer";

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/resumes/");
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname; // Appending upload timestamp to avoid duplicates
    cb(null, name);
  },
});

export const uploadFile = multer({
  storage: storageConfig,
});
