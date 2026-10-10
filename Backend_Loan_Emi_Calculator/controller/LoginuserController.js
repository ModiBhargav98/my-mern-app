const catchAsyncError = require("../middleware/catchAsyncError");
const config = require("../config/config");
const UserDb = require("../model/user");
const jwt = require("jsonwebtoken");

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserDb.findOne({ email: email, password: password });
  if (!user) {
    return res.status(200).json({
      success: false,
      msg: "Please verify email and password",
    });
  }
  let token1 = jwt.sign({ user }, config.secretKey, {
    algorithm: config.algorithm,
    expiresIn: "7d",
  });
  res.status(200).json({
    success: true,
    token: token1,
  });
});

exports.signupUser = catchAsyncError(async (req, res, next) => {
  const emiDetail = await UserDb.findOne({ email: req.body.email });
  if (!emiDetail) {
    const userData = await UserDb.create({
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json({
      success: true,
      msg: userData,
    });
  } else {
    res.status(200).json({
      success: false,
      msg: "This email already has an account",
    });
  }
});
