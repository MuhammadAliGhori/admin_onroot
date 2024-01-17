// In your server-side code
const express = require("express");
const router = express.Router();

// Import your email sending function
const { sendNotificationEmail } = require("./userController");

router.post("/sendemail", async (req, res) => {
  const { recipient, type } = req.body;

  try {
    // Customize subject and HTML based on the selected type
    let subject, html;
    if (type === "singleUser") {
      subject = "Notification for Single User";
      html = "<p>This is a notification for a single user.</p>";
    } else if (type === "allUsers") {
      subject = "Notification for All Users";
      html = "<p>This is a notification for all users.</p>";
    }

    // Use your email sending function
    await sendNotificationEmail(recipient, subject, html);

    res
      .status(200)
      .json({ status: true, message: "Email notification sent successfully" });
  } catch (error) {
    console.error("Error sending email notification:", error);
    res
      .status(500)
      .json({ status: false, message: "Failed to send email notification" });
  }
});

module.exports = router;
