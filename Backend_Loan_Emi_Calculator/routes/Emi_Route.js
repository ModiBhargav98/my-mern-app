const express = require("express");
const authentication = require("../middleware/auth");
const {
  createEmiHistory,
  getEmiHistory,
} = require("../controller/LoanemiController");
const emiRouter = express.Router();

emiRouter.get("/get-emi-details/:userId", authentication, getEmiHistory);
emiRouter.put("/loan-emi/:userId", authentication, createEmiHistory);

module.exports = emiRouter;
