const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');

// Route to get all about entries
router.get('/about', aboutController.getAllAbout);

// Route to create a new about entry
router.post('/about', aboutController.createAbout);

// Route to delete an about entry by ID
router.delete('/about/:id', aboutController.deleteAbout);

// Route to update/edit an existing about entry by ID
router.put('/about/:id', aboutController.updateAbout);

module.exports = router;