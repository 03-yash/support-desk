const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const SupportUser = require("../models/userModel");
const jwt = require("jsonwebtoken");

const registerUSer = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all details");
  }

  // Find if user already exists
  const userExist = await SupportUser.findOne({ email: email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  //    hashing password
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);


  // create user
  const user = await SupportUser.create({
    name,
    email,
    password: hashPass,
  
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Inavlid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all details");
  }
  const user = await SupportUser.findOne({ email: email });

  //   check user & pass
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credential");
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const protectedResponse = (req, res) => {
  res.status(200).json(req.user);
};

module.exports = { loginUser, registerUSer, protectedResponse };
