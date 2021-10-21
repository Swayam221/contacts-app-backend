const express = require('express');
const router = express.Router();
const Contact = require('../Models/Contact');

//add a book
router.post('/', async (req,res) =>{
    console.log(req.body.DatePublished)
    try{
        const contact = new Contact({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        });
        const savedContact = await contact.save();
        res.json(contactBook);
        console.log("contact saved successfully");
    }
    catch(err)
    {
        res.json({message: err});
        console.log(err);
    }
});


//get all books
router.get('/', async (req,res) => {
    try{
        var result = await Contact.find();
        res.json(result);
    }
    catch(err){
        res.json({message: err})
        console.log(err);
    }
})
module.exports = router;