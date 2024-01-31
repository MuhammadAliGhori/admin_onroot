// about.model.js
const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  paragraph: {
    type: String,
    required: true,
  },
});

const About = mongoose.model('About', aboutSchema);

module.exports = About;
