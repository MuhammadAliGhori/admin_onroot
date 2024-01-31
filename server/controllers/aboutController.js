const About = require('../models/aboutModel');

// Controller to get all about entries
exports.getAllAbout = async (req, res) => {
  try {
    const aboutEntries = await About.find();
    res.status(200).json(aboutEntries);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to create a new about entry
exports.createAbout = async (req, res) => {
  try {
    const { heading, paragraph } = req.body;
    const newAboutEntry = new About({ heading, paragraph });
    const savedEntry = await newAboutEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteAbout = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Check if the entry with the given ID exists
      const existingEntry = await About.findById(id);
      if (!existingEntry) {
        return res.status(404).json({ error: 'About entry not found' });
      }
  
      // Delete the entry
      await About.findByIdAndDelete(id);
  
      res.status(200).json({ message: 'About entry deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Controller to update/edit an existing about entry by ID
  exports.updateAbout = async (req, res) => {
    try {
      const { id } = req.params;
      const { heading, paragraph } = req.body;
  
      const existingEntry = await About.findById(id);
      if (!existingEntry) {
        return res.status(404).json({ error: 'About entry not found' });
      }
  
      const updatedEntry = await About.findByIdAndUpdate(
        id,
        { heading, paragraph },
        { new: true } // Returns the updated document
      );
  
      res.status(200).json(updatedEntry);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };