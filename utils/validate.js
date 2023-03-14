const mongoose = require('mongoose')

const validate = (id) => {
    const validateId = mongoose.Types.ObjectId.isValid(id)
    if(!validateId) throw new Error('not id');
    
}

module.exports = validate