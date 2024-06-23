const multer = require("multer")
const path = require("path")

var storage = multer.diskStorage({
  destination: "attach_file/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
  }
});

module.exports.attachedDocument = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // 10
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
      file.mimetype == "application/msword"
    ) {
      cb(null, true);
    }
    else {
      cb("Sorry, pick image file ", false);
    }
  },
});