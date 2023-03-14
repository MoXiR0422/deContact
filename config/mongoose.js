const mongoose = require('mongoose')


const connect = () => {
    mongoose.set('strictQuery', false)
    
    mongoose.connect('mongodb://127.0.0.1:27017/econtacts')
    .then(() => {
        console.log('mongoose connected')
    }).catch(err => {
        throw new Error(err)
    })
}

module.exports = connect