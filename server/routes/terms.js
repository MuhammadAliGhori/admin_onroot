// terms.route.js
const express = require('express');
const router = express.Router();
const termsController = require('../controllers/termsController');

// Define routes
router.post('/terms', termsController.createTerms);

// get 
router.get('/getterms', termsController.getAllTerms);

// edit
router.put('/editterm/:id', termsController.editTerms); 


// delete
router.delete('/delete/:id', termsController.deleteTerms); 

module.exports = router;
