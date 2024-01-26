const express = require("express");
const router = express.Router();
const privacyPolicyController = require("../controllers/policyController");

// Define routes
router.post("/create", privacyPolicyController.createPrivacyPolicy);
router.get("/getall", privacyPolicyController.getAllPrivacyPolicies);
router.put('/edit/:id', privacyPolicyController.editPrivacyPolicy); 
router.delete("/delete/:id", privacyPolicyController.deletePrivacyPolicy);

module.exports = router;
