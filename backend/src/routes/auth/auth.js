const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const generateToken = require("../../service/token");

router.get('/all-users', async (req, res) => {
  try {
    // Fetch all users from the database
    const allUsers = await User.find().lean();
    // Send the fetched users as a response
    res.status(200).json(allUsers);
  }
  catch (error) {
    // If an error occurs during fetching, send an error response
    console.error("Error fetching users:", error);
    res
     .status(500)
     .json({ error: "An error occurred while fetching users" });
  }
})

router.get("/all-users/:id", async (req, res) => {
  try {
    // Find the user by id
    const user = await User.findById(req.params.id).lean();
    // Send the fetched user as a response
    res.status(200).json(user);
  }
  catch (error) {
    // If an error occurs during fetching, send an error response
    console.error("Error fetching user:", error);
    res
     .status(500)
     .json({ error: "An error occurred while fetching user" });
  }
})

router.post("/register", async (req, res) => {
  try {
    // Check if request body is empty
    if (!req.body) {
      return res.status(400).json({ error: "Request body is empty" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Salt rounds: 10

    // Create a new user instance with hashed password
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // After generating the token
    const token = generateToken(savedUser._id);

    // Return the token in the response
    res.status(201).json({ token: token, user: savedUser });
  } catch (error) {
    // Handle any errors that occur during user creation or saving
    console.error("Error adding user:", error);
    res.status(500).json({ error: "An error occurred while adding the user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    // Passwords match, login successful
    res.status(200).json({ message: "Login successful", user: user, token: token });
  } catch (error) {
    // Handle any errors that occur during login
    console.error("Error during login:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
});


module.exports = router;
