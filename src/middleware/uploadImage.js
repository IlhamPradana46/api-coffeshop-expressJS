const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "public/images");
    },
    filename : (req, file, cb) => {
        const filename = file.originalname;
        const ext = path.extname(filename);
        cb(null, "img" + "-" + Date.now() + ext.toLowerCase());
    }
});

const maxImgSize = 2 * 1024 * 1024;

const upload = multer({
    storage : storage,
    fileFilter : (req, file, cb) => {
        if( file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
            cb(null, true);
        } else{
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
    limits : { fileSize : maxImgSize }
});

module.exports = upload