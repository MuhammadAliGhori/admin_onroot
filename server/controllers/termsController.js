const Terms = require("../models/termsModel");

exports.createTerms = async (req, res) => {
  try {
    const { heading, paragraph1, paragraph2, paragraph3 } = req.body;
    const newTerms = await Terms.create({
      heading,
      paragraph1,
      paragraph2,
      paragraph3,
    });
    res.status(201).json(newTerms);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// get
exports.getAllTerms = async (req, res) => {
  try {
    const allTerms = await Terms.find();
    res.status(200).json(allTerms);
  } catch (error) {
    console.error('Error fetching terms:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Edit terms by ID
exports.editTerms = async (req, res) => {
  try {
    const termsId = req.params.id;
    const { heading, paragraph1, paragraph2, paragraph3 } = req.body;

    const updatedTerms = await Terms.findByIdAndUpdate(
      termsId,
      { heading, paragraph1, paragraph2, paragraph3 },
      { new: true }
    );

    if (!updatedTerms) {
      return res.status(404).json({ message: 'Terms not found' });
    }

    return res.status(200).json({
      message: 'Terms updated successfully',
      terms: updatedTerms,
    });
  } catch (error) {
    console.error('Error while updating terms:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// delete
exports.deleteTerms = async (req, res) => {
  try {
    const deletedTerm = await Terms.findByIdAndDelete(req.params.id);
    
    if (!deletedTerm) {
      return res.status(404).json({ error: 'Term not found' });
    }

    res.status(200).json({ message: 'Term deleted successfully' });
  } catch (error) {
    console.error('Error deleting term:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};