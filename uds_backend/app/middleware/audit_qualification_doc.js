const multer = require("multer")
const path = require("path")

var storage = multer.diskStorage({
    destination: "audit_qualification_doc/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

module.exports.upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 100, // 10
    },

    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "text/csv" ||
            file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet (xlsx)" ||
            file.mimetype == "application/xhtml+xml" ||
            file.mimetype.includes("excel") ||
            file.mimetype.includes("spreadsheetml")
        ) {
            cb(null, true);
        } else {
            cb("Sorry, pick valid file ", false);
        }
    },
});