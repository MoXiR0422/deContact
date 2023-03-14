const router = require('express').Router()
const { addContact, getAllContacts, updateContact, uploadingImg, deleteContact } = require('../controllers/constactController')
const { authMiddleWare } = require('../middleware/middleware')
const upload = require('../middleware/multer')


router.post('/add', authMiddleWare, addContact)
router.get('/contacts/:id', getAllContacts)
router.put('/update/:id', updateContact)
router.put('/upload/:id', upload.array("image", 10), uploadingImg)
router.delete('/delete', authMiddleWare, deleteContact)


module.exports = router