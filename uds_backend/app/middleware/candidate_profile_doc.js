const multer = require("multer")
const path = require("path")

var storage = multer.diskStorage({
    destination: "candidate_profile_doc/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
});

module.exports.upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1000, // 10
    },

    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "image/gif" ||
            file.mimetype == "image/PNG" ||
            file.mimetype == "image/JPG" ||
            file.mimetype == "image/JPEG" ||
            file.mimetype == "image/GIF" ||
            file.mimetype == "application/vnd.openxmlformats" ||
            file.mimetype == "application/pdf" ||
            file.mimetype == "application/msword"
        ) {
            cb(null, true);
        } else {
            cb("Sorry, pick Pdf file ", false);
        }
    },
});