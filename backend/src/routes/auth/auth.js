const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const Admin = require("../../models/Admin");
const generateToken = require("../../service/token");
const multer = require("multer");
const path = require("path");

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

// admins and super admins

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
})


// REGISTER
router.post('/register-admin', upload.single('file'), async (req, res) => {
  try {
    const { login, password } = req.body;
    const file = req.file.filename
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds: 10

    const newAdmin = new Admin({
      login: login,
      password: hashedPassword,
      file: file,
    })

    const savedAdmin = await newAdmin.save();

    const token = generateToken(savedAdmin._id);

    res.status(201).json({ adminToken: token, admin: savedAdmin});
  }
  catch (error) {
    console.error("Error adding admin:", error);
    res.status(500).json({ error: "An error occurred while adding the admin" });
  }
})

router.get('/register-admin', async (req, res) => {
  try {
    const allAdmins = await Admin.find().lean();
    res.status(200).json(allAdmins);
  }
  catch (error) {
    console.error("Error fetching admins:", error);
    res
     .status(500)
     .json({ error: "An error occurred while fetching admins" });
  }
})

// PUT REGISTER ONLY ADMIN CAN DO IT

router.put('/register-update/:adminId', upload.single('file'), async (req, res) => {
  try {
    const adminId = req.params.adminId;

    const { login, password } = req.body;
    const file = req.file.filename; // Assuming you're only updating the file

    // Find admin by id
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    // Hash the password if it's provided
    const hashedPassword = password ? await bcrypt.hash(password, 10) : admin.password;

    // Update the admin with the new data
    admin.login = login;
    admin.password = hashedPassword;
    admin.file = file;

    // Save the updated admin
    const updatedAdmin = await admin.save();

    // Send the updated admin as a response
    res.status(200).json(updatedAdmin);
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({ error: "An error occurred while updating the admin" });
  }
});


// /REGISTER 



router.post('/login-admin', async (req, res) => {
  try {
    const { login, password } = req.body;
    const admin = await Admin.findOne({ login });

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(admin._id);

    res.status(200).json({ adminToken: token, admin: admin });
  }
  catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
});


module.exports = router;
