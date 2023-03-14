const router = require('express').Router()
const Users = require('../models/users')
const asyncHandler = require('express-async-handler')
const { serialize } = require('cookie')
// const validate = require('../utils/validate')
const { deleteAccount, forgotPass } = require('./nodemailer')
const crypto = require('crypto')

const regis = asyncHandler(async(req, res) => {
    const email = req.body.email
    const find = await Users.findOne({email: email})
    if(!find){
        const newUser = await Users.create(req.body)
        res.json(newUser)
    }else{
        throw new Error('User Already Exists')
    }
})

const login = asyncHandler(async(req, res) => {
    const { username, password } = req.body
    const find = await Users.findOne({username})

    if(find && (await find.isPasswordMatched(password))){
        const dataToSecure = {
            dataToSecure: "This is the secret data in the cookie.",
          };
        res.cookie("secureCookie", JSON.stringify(dataToSecure), {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 1000
          });

        res.json({
            _id: find?._id,
            username: find?.username,
            email: find?.email,
        })
        
    }else{
        throw new Error('username or password error')
    }
})


const logOut = asyncHandler(async(req, res) => {
    try{
        res.clearCookie('secureCookie')
        res.json('clear cookie and user logout')
    }catch(err){
        throw new Error('Not registered')
    }
})


const editUser = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body
    const { _id } = req.user
    const find = await Users.findOne({username, email})
    try{
        if(!find){
            const update = await Users.findByIdAndUpdate(_id, {
                username: req?.body?.username,
                email: req?.body?.email,
                password: req?.body?.password
            }, 
            { 
                new: true
            })
            res.json(update)
            console.log(update)
        }else{
            throw new Error('note regis')
        }
    }catch(err){
        throw new Error(err)
    }
    
})

const getDeleteAccaunts = asyncHandler(async(req, res) => {
    const { email } = req.body
    const { userId } = req.body
    // console.log(userId)
    try{
        const find = await Users.findOne({email:email})
        // const userid = await Users.findById({_id: req.body._id})
      
        if(find){
            const deleteUrl = `Привет пожалуйста нажмите на линк чтобы подтверждать удаления аккаунта <a href='http://localhost:8000/api/users/deleteAccount/${userId}'>Нажмите сюда</a> срок линка 10 минут`
            const data = {
            from: "kutubxona655@gmail.com",
            to: email,
            subject: "Подтверждения для удаления аккаунта",
            text: deleteUrl
        }
        deleteAccount(data)
        res.json('Sended')
    }else{
        throw new Error('user not found')
    }
    }catch(err){
        throw new Error(err)
    }
})

const deleteAccaunt = asyncHandler(async(req, res) => {
    const { id } = req.params
    const find = await Users.findByIdAndDelete({_id: id})
    // console.log(find)
    if(find){
        res.clearCookie('secureCookie')
        res.json('user is deleted')
    }else{
        throw new Error('not delete account')
    }
})

const forgotPassword = asyncHandler(async(req, res) => {
    const { email, userId } = req.body
    const find = await Users.findOne({email})
    if(find){
        const textUrl = `Привет пожалуйста нажмите на линк чтобы подтверждать аккаунта <a href='http://localhost:8000/api/users/forgotPassword/${userId}'>Нажмите сюда</a> срок линка 10 минут` 
        const data = {
            from: "kutubxona655@gmail.com",
            to: email,
            subject: "Подтверждения аккаунта",
            text: textUrl
        }
        forgotPass(data)
        res.json("sended")
    }
})

const forgotUpdate = asyncHandler(async(req, res) => {
    const { passwordUser } = req.body
    const { id } = req.params
    const find = await Users.findById({_id: id})
    if(find){
        const hashing = crypto.createHash('sha256').update(passwordUser).digest('hex')
        const update = await Users.findOne({
            password: hashing
        })
        update.password = passwordUser
        await update.save()
        res.json(update)
    }else{
        throw new Error('note updated password')
    }
})

// const upload = asyncHandler(async(req, res) => {
//     const { id } = req.params
   
// })




module.exports = { 
    regis, 
    login, 
    logOut, 
    editUser, 
    getDeleteAccaunts, 
    deleteAccaunt, 
    forgotPassword,
    forgotUpdate
}