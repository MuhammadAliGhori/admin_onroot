const PrivacyPolicy = require('../models/policyModel');

// Controller function to handle the creation of privacy policy
exports.createPrivacyPolicy = async (req, res) => {
  try {
    const { heading, section1, section2, section3 } = req.body;
    const newPrivacyPolicy = await PrivacyPolicy.create({ heading, section1, section2, section3 });
    res.status(201).json(newPrivacyPolicy);
  } catch (error) {
    console.error('Error creating privacy policy:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to handle the retrieval of all privacy policies
exports.getAllPrivacyPolicies = async (req, res) => {
  try {
    const allPrivacyPolicies = await PrivacyPolicy.find();
    res.status(200).json(allPrivacyPolicies);
  } catch (error) {
    console.error('Error fetching privacy policies:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to handle the deletion of a privacy policy
exports.deletePrivacyPolicy = async (req, res) => {
  try {
    const deletedPrivacyPolicy = await PrivacyPolicy.findByIdAndDelete(req.params.id);
    
    if (!deletedPrivacyPolicy) {
      return res.status(404).json({ error: 'Privacy policy not found' });
    }

    res.status(200).json({ message: 'Privacy policy deleted successfully' });
  } catch (error) {
    console.error('Error deleting privacy policy:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
