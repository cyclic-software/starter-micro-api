require("dotenv").config();
const QRCode = require("qrcode");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// allows data receiving and destructing
const app = express();
// allow Cross-Origin Resource Sharing
app.use(cors())
const PORT = process.env.PORT || 3000;
app.use(express.json());

mongoose.connect(
  "mongodb+srv://najadams:UB5F3QO3OYMS5vC0@cluster0.xexrmso.mongodb.net/?retryWrites=true&w=majority"
);

// mongoose.connect("mongodb://127.0.0.1:27017/test");
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");

  // Define a Mongoose schema and model
  const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    studentId: { type: String, unique: true },
    indexNumber: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
  });

  const User = mongoose.model("User", userSchema);

  // Endpoint to check for successful connection
  app.get("/", async (req, res) => {
    try {
      res.sendFile(__dirname + "/public/index.html");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to load index.html" });
    }
  });

  // Register endpoint
  app.post("/register", async (req, res) => {
    try {
      const { firstname, lastname, studentId, indexNumber, email, password } =
        req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      console.log("registering data");

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert a new user
      await User.create({
        firstname,
        lastname,
        studentId,
        indexNumber,
        email,
        password: hashedPassword,
      });

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // Login endpoint
  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("tried login")

      // Find the user by email
      const user = await User.findOne({ email });

      // Check if the user exists
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate a JWT token
      const secretKey = process.env.JWT_SECRET || "default_secret_key";
      const token = jwt.sign({ userId: user._id }, secretKey, {
        expiresIn: "1h",
      });

      res.status(200).json({ token, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // Get user details endpoint using MongoDB
  app.get("/user/:email", async (req, res) => {
    try {
      const email = req.params.email;
      console.log("user search was used")

      // Find the user by email using Mongoose
      const user = await User.findOne({ email });

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });


  // endpoint for generating qrcodes
  let generatedQRCodeData = "";
  app.post("/submitForm", async (req, res) => {
    try {
      const inputData = req.body.inputData;

      if (inputData) {
        generatedQRCodeData = inputData;
        const qrCodeDataURL = await QRCode.toDataURL(inputData);
        const responseHtml = `<img src="${qrCodeDataURL}" alt="QR Code"/>`;
        res.status(200).send(responseHtml);
      } else {
        res.status(400).json({ message: "Input data is missing" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // endpoint to send data to user-side
  app.get("/getQRCodeData", (req, res) => {
    try {
      res.status(200).json({ data: generatedQRCodeData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // Endpoint to mark a user as present
  app.post("/markUserAsPresent", async (req, res) => {
    try {
      const userID = req.body.userID;

      // Check if userID is provided
      if (!userID) {
        return res.status(400).json({ message: "UserID is required" });
      }

      // Insert the attendance record
      // You need to implement this part based on your MongoDB structure
      console.log("User marked as present in Attendance table");
      res.status(200).json({ message: "User marked as present successfully" });
    } catch (error) {
      console.error("Error marking user as present:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // start server to listen to index page
  app.use(express.static("public"));

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
