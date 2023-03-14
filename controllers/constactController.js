const Contacts = require('../models/contacts')
const asyncHandler = require('express-async-handler')
const Users = require('../models/users')
const uploaderImg = require('../utils/cloudinary')
const fs = require('fs')

// add contact
const addContact = asyncHandler(async(req, res) => {
    const { userId , contact, number } = req.body
    // console.log(userId)
    const find = await Users.findById(userId)
    if(find){
        const add = await Contacts.create({
            createdBy: find._id,
            contactName: contact,
            PhoneNumber: number
        })
        res.json(add)
    }else{
        throw new Error('note regis')
    }
   
})

//get all contact for user
const getAllContacts = asyncHandler(async(req, res) => {
    const { id } = req.params
    const find = await Users.findById(id)
    if(find){
        const getAll = await Contacts.find({createdBy: id})
        res.json(getAll)
    }else{
        throw new Error('Not contact')
    }
})

//image contact
const uploadingImg = asyncHandler(async(req, res) => {
    const { id } = req.params
    // const { contactId } = req.body
    // console.log(req.files)
    const uploader = (path) => uploaderImg(path, "images")
    const mas = []
    const files = req.files
    for(const file of files){
        const { path } = file
        const newPath = await uploader(path)
        mas.push(newPath)
        fs.unlinkSync(path)
    }
    
    const load = await Contacts.findByIdAndUpdate(id, {
        ContactImage: mas.map((file) => {return file})
    }, { new: true })
    res.json(load);
}) 


//update contact
const updateContact = asyncHandler(async(req, res) => {
    const { conId, contactName, phoneNumber, contactImg } = req.body
    const { id } = req.params
    const find = await Users.findById(id)
    if(find){
        const updateContact = await Contacts.findByIdAndUpdate(conId, {
            contactName: contactName,
            PhoneNumber: phoneNumber
        }, {new: true})
        res.json(updateContact)
    }else{
        throw new Error('note updated')
    }
})

//delete contacts
const deleteContact = asyncHandler(async(req, res) => {
    const { conId, userId } = req.body
    const find = await Users.findById(userId)
    const findUser = await Users.findById(conId)
    if(find){
        if(findUser){
            const deleteCon = await Contacts.findByIdAndDelete(conId)
            res.json(deleteCon)
        }else{
            throw new Error('not contact in delete')
        }
    }else{
        throw new Error('not deleted')
    }
})

module.exports = {
    addContact,
    getAllContacts,
    uploadingImg,
    updateContact,
    deleteContact
}