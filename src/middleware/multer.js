import createHttpError from "http-errors";
import multer from "multer";

// req.file
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter(req, file, callback) {
    if (!file.mimetype || !file.mimetype.startsWith("image/")) {
      return callback (
        createHttpError(400, "Only images allowed"),
      );
    }

    callback(null, true);

    // ✅ callback(null, true)
    // 😂 callback(null, false)
    // ❌callback(new Error("bad file"))
  },
});
