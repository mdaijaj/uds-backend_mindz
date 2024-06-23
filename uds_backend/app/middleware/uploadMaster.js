const multer = require("multer")
const path = require("path")

var storage = multer.diskStorage({
  destination: "updatedocument/",
  filename: (req, files, cb) => {
    cb(null, files.fieldname + "-" + Date.now() + path.extname(files.originalname));
  }
});

module.exports.upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100, // 100mb
  },

  fileFilter: (req, files, cb) => {
    if (
      files.mimetype == "image/png" ||
      files.mimetype == "image/jpg" ||
      files.mimetype == "image/jpeg" ||
      files.mimetype == "image/gif" ||
      files.mimetype == "image/PNG" ||
      files.mimetype == "image/JPG" ||
      files.mimetype == "image/JPEG" ||
      files.mimetype == "image/GIF" ||
      files.mimetype == "application/msword" ||
      files.mimetype == "application/vnd.openxmlformats" ||
      files.mimetype == "application/pdf" ||
      files.mimetype == "application/msword" ||
      files.mimetype == "text/csv" ||
      files.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      files.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet (xlsx)" ||
      files.mimetype == "application/xhtml+xml" ||
      files.mimetype.includes("excel") ||
      files.mimetype.includes("spreadsheetml")
    ) {
      cb(null, true);
    } else {
      cb("Sorry, pick file ", false);
    }
  },
});
