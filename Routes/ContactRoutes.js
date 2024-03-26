const express= require('express');

const router= express.Router();
const {getContact,postContact,getSingleContact, updateContact, deleteContact} =require('../controller/ContactController')


// GET DATA  AND  CREATE- DATA
router.route('/').get(getContact).post(postContact)


// GET INDIVIDUAL DATA  AND UPDATE INDIVIDUAL DATA  AND DELETE INDIVIDUAL DATA
router.route('/:id').get(getSingleContact).put(updateContact).delete(deleteContact);




module.exports= router