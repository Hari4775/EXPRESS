
const asyncHandler =require('express-async-handler')
const contactModel= require('../Models/contactModels')
// @desc GET  all contacts
// @route GET  /api/contacts
// @route public

const getContact=asyncHandler(async(req,res)=>{
    const contacts =await contactModel.find()
    res.status(200).json(contacts)
})
//_____________________________________________________





// @desc CREATE - CONTACTS  
// @route post  /api/contacts
// @route public

const postContact=asyncHandler(async(req,res)=>{
    console.log("the req  body is",req.body)
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const contact = await contactModel.create({
        name,
        email,
        phone
    });
    
    res.status(200).json(contact)
})
//_____________________________________________________




// @desc UPDATE - CONTACTS  
// @route put  /api/contacts
// @route public
const getSingleContact=asyncHandler(async(req,res)=>{
    const contact = await contactModel.findById(req.params.id);
    if(!contact){
        res.status(404)
        throw new Error('Contact not founded');
    }
    res.status(200).json(contact)
})
//_____________________________________________________





// @desc UPDATE - CONTACTS  
// @route put  /api/contacts
// @route public
const updateContact=asyncHandler(async(req,res)=>{
    const contact = await contactModel.findById(req.params.id);  
    if(!contact){
        res.status(404)
        throw new Error('contact not available')
    }
    const updatedContact = await contactModel.findByIdAndUpdate(    //findByIdAndUpdate is used for updating
        req.params.id,
        req.body,
        {new:true}
        );
    res.status(200).json(updatedContact)
})
//_____________________________________________________




// @desc UPDATE - CONTACTS  
// @route put  /api/contacts
// @route public
const deleteContact=asyncHandler(async(req,res)=>{
    const contact = await contactModel.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("contact not available")
    }

    await contactModel.deleteOne();  //deleOne() used for DELETING THE  DATA FROM DB
    res.status(200).json(contact);
})
//_____________________________________________________


module.exports = {getContact,postContact,getSingleContact,updateContact,deleteContact}