const mongoose = require('mongoose');

const privacyPolicySchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  section1: {
    type: String,
    required: true,
  },
  section2: {
    type: String,
  },
  section3: {
    type: String,
  },
});

const PrivacyPolicy = mongoose.model('PrivacyPolicy', privacyPolicySchema);

module.exports = PrivacyPolicy;
