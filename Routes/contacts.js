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
        res.json(savedContact);
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

// delete contact
router.delete('/:contactId', async (req, res) => {
    try {
        const removedContact = await Contact.deleteOne({ _id: req.params.contactId });
        res.json(removedContact);
    } catch (err) {
        res.json({ message: err });
    }
});

//patch 
router.post('/:contactId', async function (req, res) {
    try {
        var updatedContact = await Contact.updateOne({ _id: req.params.contactId }, {
            $set:{
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            }
        });
        res.json(updatedContact);
    } catch (err) {
        res.json({ message: err });
    }
});
module.exports = router;