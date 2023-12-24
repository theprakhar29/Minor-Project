const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

//Register A User Account
router.post("/register", async (req, res) => {
  try {
    // checking if user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.send({
        success: false,
        message: "User already exists",
      });
    }
    // hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      message: "User Registered Successfully",
      success: true,
      data: null,
    });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

//Login User Account
router.post("/login", async (req, res) => {
  try {
    // check is user exists
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        message: "User does not exist",
        success: false,
      });
    }

    // checking for valid Password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.send({
        success: false,
        message: "Invalid Password",
      });
    }

    // generating Web Tokens
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
      expiresIn: "1d",
    });
    res.send({
      message: "Login Successfully",
      success: true,
      data: token,
    });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

//Getting User Details
router.post("/get-user-info", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    user.password = "";
    res.send({
      message: "User Details fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

module.exports = router;