const Itinerary = require("../models/itinerary");

// itneraryPost
const createItineraryPost = async (req, res) => {
  try {
    const {
      userID,
      posts,itTitle
    } = req.body;
    
    const itinerary = await Itinerary.create({
      userID,
      itTitle,
      posts,
    });
    res.status(201).json(itinerary);
  } catch (err) {
    if (err.name === "ValidationError") {
      const errorMessages = Object.values(err.errors).map(
        (error) => error.message
      );
      res.status(400).json({ error: errorMessages });
    } else {
      res.status(500).json({ error: "Unable to create the itinerary" });
    }
  }
};
const itneraryDetail = async (req, res) => {
  const {
    id,
  } = req.body;

  try {
    // You can use the objectId to create an itinerary
    const itinerary = await Itinerary.findOne({ _id: id });

    res.status(201).json({ status: true, message: 'Successful', data: itinerary });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errorMessages = Object.values(err.errors).map(
        (error) => error.message
      );
      res.status(400).json({ error: errorMessages });
    } else {
      res.status(500).json({ error: "Unable to create the itinerary" });
    }
  }
};
const addItneraryLike = async (req, res) => {
  try {
    const { itineraryID, userID } = req.body;

    // Find the itinerary by its ID
    const itinerary = await Itinerary.findById(itineraryID);

    if (!itinerary) {
      return res.status(404).json({ error: "Itinerary not found." });
    }

    // Check if the user's ID is already in the likes array
    const indexOfUser = itinerary.likes.indexOf(userID);

    if (indexOfUser === -1) {
      // User has not liked the itinerary, add the user's ID to the likes array
      itinerary.likes.push(userID);
      var message = "User liked the itinerary.";
    } else {
      // User has already liked the itinerary, remove their ID from the likes array
      itinerary.likes.splice(indexOfUser, 1);
      var message = "User unliked the itinerary.";
    }

    // Save the updated itinerary
    const updatedItinerary = await itinerary.save();

    return res.status(200).json({
      status: indexOfUser === -1, // Set to true if liked, false if unliked
      message,
      data: updatedItinerary,
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      error: "Failed to like/unlike itinerary. " + error.message,
    });
  }
};


// userlike
const userLikedItinerary = async (req, res) => {
  try {
    const { itineraryID, userID } = req.body;

    // Find the itinerary by its ID
    const itinerary = await Itinerary.findById(itineraryID);

    if (!itinerary) {
      return res.status(404).json({ error: "Itinerary not found." });
    }

    // Check if the user's ID is in the likes array
    const isLiked = itinerary.likes.includes(userID);

    return res.status(200).json({
      status: isLiked,
      message: isLiked ? "User liked the itinerary." : "User has not liked the itinerary.",
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      error: "Failed to check if user liked itinerary. " + error.message,
    });
  }
};

// getlikes
const userLikedItineraries = async (req, res) => {
  try {
    const userID = req.params.userID;

    // Find all itineraries where the user's ID is in the likes array
    const likedItineraries = await Itinerary.find({ likes: userID });

    return res.status(200).json({
      likedItineraries,
      message: likedItineraries.length > 0 ? "User has liked itineraries." : "User has not liked any itineraries.",
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      error: "Failed to get liked itineraries for the user. " + error.message,
    });
  }
};

// get Trips
const getItnerary = async (req, res) => {
  try {
    const { id } = req.params; 

    const itinerary = await Itinerary.findById(id);

    if (!itinerary) {
      return res.status(404).json({ error: "Itinerary not found." });
    }

    res.status(200).json({
      status: true,
      message: "Itinerary retrieved successfully.",
      data: itinerary,
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      error: "Failed to retrieve itinerary. " + error.message,
    });
  }
};

module.exports = {
  createItineraryPost,
  itneraryDetail,
  addItneraryLike,
  userLikedItinerary,
  getItnerary,
  userLikedItineraries
};
