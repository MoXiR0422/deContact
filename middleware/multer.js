const path  = require('path')
const multer = require('multer')

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cd) => {
        let ext = path.extname(file.originalname)
        if(ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png"){
            cd(new Error('File type is not supported'), false)
            return;
        }
        cd(null, true)
    }
})