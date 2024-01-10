// adminRoutes.js
const express = require('express');
const bodyParser = require('body-parser');
const adminController = require('./adminController');

const router = express.Router();
router.use(bodyParser.json());

// Create admin account endpoint
router.post('/create-admin', adminController.createAdmin);

// Admin login endpoint
router.post('/login', adminController.login);

// Password reset endpoint
router.post('/reset-password', adminController.resetPassword);

module.exports = router;
