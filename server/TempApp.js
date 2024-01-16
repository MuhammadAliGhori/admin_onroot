require("dotenv").config();
const express = require("express");
const staticItems = require("./models/staticData");
const connectDB = require("./db/connect");
const path = require('path');
const https = require('https');
const fs = require('fs');

const app = express();

app.use(express.json({ limit: "10mb" }));

var cors = require("cors");

app.use(cors());

// Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (!req.secure) {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

// Get the directory path using fileURLToPath function
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 8000;

const recommendations_routes = require("./routes/recommendations");
const trips_routes = require("./routes/tripsRoute");
const tripPlan_routes = require("./routes/tripPlanRoutes");
const savePostRoute = require("./routes/savePostRoute");
const saveTripRoute = require("./routes/saveTripsRoute");
const userRoutes = require("./routes/userRoutes");
const itineraryPost = require("./routes/itinerary");
const creacreateRecommendation = require("./routes/recommendations");
const SaveTrips = require("./models/saveTrips");

app.get("/", (req, res) => {
  res.send("Hi, This is API Developed by Sunny");
});

// staticData
// GET /items - Get all items
app.get("/staticdata", (req, res) => {
  try {
    res.json(staticItems);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/im-onroot.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/im-onroot.com/fullchain.pem'),
};

// Create an HTTPS server
const server = https.createServer(httpsOptions, app);

// Recommendations
app.use("/api/recommendations", recommendations_routes);

// Trips
app.use("/api/trips", trips_routes);

// User routes
app.use("/api/users", userRoutes);

// Create Recommendation
app.use("/api/createrecommendation", creacreateRecommendation);

// Itinerary posts
app.use("/api/itineraryposts", itineraryPost);

// Save posts
app.use("/api/savepost", savePostRoute);

// Save Trips
app.use("/api/savetrip", saveTripRoute);

app.use("/api/tripPlans", tripPlan_routes);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    server.listen(PORT, () => {
      console.log(`${PORT} Yes, I'm connected`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
