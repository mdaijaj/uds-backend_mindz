const multer = require("multer")
const path = require("path")

var storage = multer.diskStorage({
    destination: "Asset_Management_pdf/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

module.exports.upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10, // 10
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
            files.mimetype == "application/pdf" ||
            files.mimetype == "application/msword" ||
            files.mimetype == "text/csv"
        ) {
            cb(null, true);
        } else {
            cb("Sorry, pick valid file ", false);
        }
    },
});