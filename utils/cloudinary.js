const cloudinary = require('cloudinary')
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.ClOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const upload = async(fileTOUpload) => {
    return new Promise((resolve) => {
        cloudinary.uploader.upload(fileTOUpload, (res) => {
        resolve({
            url: res.secure_url
        },{
            resourse_type: "auto"
            })
        })
    })
}

module.exports = upload