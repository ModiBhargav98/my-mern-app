const express = require("express");
// const passport = require("passport");
const { loginUser, signupUser } = require("../controller/LoginuserController");
const userRouter = express.Router();

userRouter.post("/user-login", loginUser);
userRouter.post("/create-user", signupUser);

module.exports = userRouter;
