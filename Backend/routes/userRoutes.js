const express = require("express");
const {
  registerUSer,
  loginUser,
  protectedResponse,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", registerUSer);

router.post("/login", loginUser);

router.post("/protected",protect , protectedResponse);

module.exports = router;
