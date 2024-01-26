// terms.model.js
const mongoose = require('mongoose');

const termsSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  paragraph1: {
    type: String,
    required: true,
  },
  paragraph2: {
    type: String,
  },
  paragraph3: {
    type: String,
  },
});

const Terms = mongoose.model('Terms', termsSchema);

module.exports = Terms;
