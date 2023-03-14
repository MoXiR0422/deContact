const nodemailer = require('nodemailer')
const Users = require('../models/users')
const asyncHandler = require('express-async-handler')


const deleteAccount = asyncHandler(async(data, req, res) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'kutubxona655@gmail.com',
            pass: 'afrbijcfijrbmhzk'
        }
    })

    let mailOption = {
        from: data.from,
        to: data.to,
        subject: data.subject,
        text: data.text
    }
    transporter.sendMail(mailOption, function(err, res){
        if(err){
            console.log(err)
        }else{
            console.log('email send: ' + res.response)
        }
    })

})

const forgotPass = asyncHandler(async(data, req, res) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'kutubxona655@gmail.com',
            pass: 'afrbijcfijrbmhzk'
        }
    })

    let mailOption = {
        from: data.from,
        to: data.to,
        subject: data.subject,
        text: data.text
    }

    transporter.sendMail(mailOption, function(err, info){
        if(err){
            console.log(err)
        }else{
            console.log('email send' + info.response)
        }
    })
})


module.exports = { deleteAccount, forgotPass }