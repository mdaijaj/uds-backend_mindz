const multer = require("multer")
const path = require("path")

var storage = multer.diskStorage({
  destination: "certificate_Master/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

module.exports.certificateMaster = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100, // 100
  },

  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb("Sorry, pick image file ", false);
    }
  },
});