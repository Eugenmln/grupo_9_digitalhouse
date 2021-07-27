const path = require ("path");
const multer = require ("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb)  => {
        cb(null, path.resolve(__dirname, "../../public/images/avatar/"))
    },
    filename: (req, file, cb) => {
        let newFileName = "/avatar" + Date.now() + path.extname(file.originalname);
        cb(null, newFileName)
    }
})
 


    const uploadFile = multer ({ storage });

    module.exports = uploadFile;