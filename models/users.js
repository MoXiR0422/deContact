const mongoose = require('mongoose')
const bycript = require('bcrypt')
const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
}, {
    timestamps: true
})
userSchema.pre("save", async function (next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bycript.genSalt(10)
    this.password = await bycript.hash(this.password, salt)
})

userSchema.methods.isPasswordMatched = async function(enterPass){
    return await bycript.compareSync(enterPass, this.password)
}

userSchema.methods.updatePassword = async function(pass){
    return await bycript.hash(pass, 10)
}

module.exports = mongoose.model('Users', userSchema)