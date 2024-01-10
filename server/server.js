// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const adminRoutes = require("./adminRoutes");
const { createAdmin } = require('./adminController');

const app = express();

// MongoDB connection
mongoose.connect(
  "mongodb+srv://alighori:I6WiKi3uzox6M8bY@cluster0.1mpdua1.mongodb.net",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(bodyParser.json());

// Use adminRoutes for all routes starting with /admin
app.use("/admin", adminRoutes);

createAdmin();

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
