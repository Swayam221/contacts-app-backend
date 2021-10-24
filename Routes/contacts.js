const express = require('express');
const router = express.Router();
const Contact = require('../Models/Contact');

//add a contact
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


//get all contacts
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

// search contacts
router.get('/search/:query/', async (req, res) => {

    let searchText = req.params.query;
    searchText = searchText.trim();
    var searchTexts = searchText.split(" ");
    var searchTextList = [];
    for (i = 0; i < searchTexts.length; i++) {
        var reg = new RegExp(searchTexts[i], "i")
        searchTextList.push({
            firstName: {
                $regex: reg
            }
        })
        searchTextList.push({
            lastName: {
                $regex: reg
            }
        })
        searchTextList.push({
            email: {
                $regex: reg
            }
        })
    }

    
    // var fullTextSearchOptions = {
    //     "$text": {
    //         "$search": searchText
    //     }
    // };

    var regexSearchOptions = {
        $or: searchTextList
    };
    
    
    Contact.find(regexSearchOptions, { firstName: 1, lastName: 1, email:1, _id:1}, function (err, docs) {

        if (err) {
            res.json({ message: err });
        } else if (docs) {
            res.json(docs);
        }

    });
})

module.exports = router;