const express = require("express");
const app = express();
app.use(express.json());
// const isLoggedIn = require("./Middleware/auth");
// const passport = require("passport");
// const bp = require('body-parser')
// const cookieSession = require("cookie-session");
var cors = require("cors");
app.use(cors());

const Emi = require("./routes/Emi_Route");
const Login = require("./routes/Login_Route")

app.use("/", Emi);
app.use("/",Login)

module.exports = app;
