// adminController.js
const bcrypt = require("bcryptjs");
const Admin = require("../models/adminModel");

// Admin login logic
async function login(req, res) {
  const { userId, password } = req.body;

  try {
    console.log("Attempting login with:", userId, password);

    const admin = await Admin.findOne({ userId });

    if (!admin) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Retrieved hashed password:", admin.password);

    const passwordMatch = await bcrypt.compare(password, admin.password);

    console.log("Password match result:", passwordMatch);

    if (!passwordMatch) {
      console.log("Invalid credentials");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// Password reset logic
async function resetPassword(req, res) {
  const { userId, newPassword } = req.body;

  try {
    const admin = await Admin.findOne({ userId });

    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    admin.password = hashedPassword;
    await admin.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}
async function createAdmin() {
  const userId = "admin";
  const password = "123";

  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ userId });

    if (existingAdmin) {
      console.log("Admin already exists.");

      // Update the existing admin's password if needed
      const hashedPassword = await bcrypt.hash(password, 10);
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();

      console.log("Admin password updated successfully.");

      return; // Return to prevent creating a new admin
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin user
    const admin = new Admin({
      userId: userId,
      password: hashedPassword,
    });

    await admin.save();

    console.log("Admin account created successfully.");
  } catch (error) {
    console.error("Error creating/updating admin account:", error.message);
  }
}

module.exports = {
  createAdmin,
  login,
  resetPassword,
};
