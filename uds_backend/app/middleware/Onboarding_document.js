const multer = require("multer")
const path = require("path")

var storage = multer.diskStorage({
  destination: "onboarding_docs/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + file.originalname + path.extname(file.originalname));
  }
});

module.exports.candidate_docs = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100, // 10mb
  },

  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/gif" ||
      file.mimetype == "image/PNG" ||
      file.mimetype == "image/JPG" ||
      file.mimetype == "image/JPEG" ||
      file.mimetype == "image/GIF" ||
      file.mimetype == "application/msword" ||
      file.mimetype == "application/vnd.openxmlformats" ||
      file.mimetype == "application/pdf" ||
      file.mimetype == "application/msword" ||
      file.mimetype == "text/csv" ||
      file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.mimetype == "application/xhtml+xml"
    ) {
      cb(null, true);
    } else {
      cb("Sorry, pick image file ", false);
    }
  },
});