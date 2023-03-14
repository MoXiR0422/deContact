const Users = require('../models/users')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')


const authMiddleWare = asyncHandler(async(req, res, next) => {
    const { userId } = req.body
    const users = await Users.findById(userId)
    if(users){
        req.user = users
        next()
    }else{
        throw new Error('not authmiddleware')
    }
})  

module.exports = { authMiddleWare }
