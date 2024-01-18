import multer from "multer";

// We need to specify two things to multer:
// 1. Where do we want to store the file
// 2. What should be the name of the file while storing

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname; // Appending upload timestamp to avoid duplicates
    cb(null, name);
  },
});

export const uploadFile = multer({
  storage: storageConfig,
});
