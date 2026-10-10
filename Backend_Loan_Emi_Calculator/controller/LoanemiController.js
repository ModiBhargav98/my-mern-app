const catchAsyncError = require("../middleware/catchAsyncError");
const EmiDb = require("../model/emihistory");

exports.getEmiHistory = catchAsyncError(async (req, res, next) => {
  const userEmiHistory = await EmiDb.findOne({ userId: req.params.userId });
  if (!userEmiHistory) {
    return res
      .status(200)
      .json({ success: false, msg: "Your Emi History Not Founded" });
  }
  res.status(200).json({ success: true, msg: userEmiHistory });
});

exports.createEmiHistory = catchAsyncError(async (req, res, next) => {
  const { amount, rate, months } = req.body;

  if (amount == null || rate == null || months == null) {
    return res.status(400).json({ success: false, msg: "Amount, rate, and months are required" });
  }

  const p = Number(amount);
  const r = Number(rate);
  const n = Number(months);

  if (isNaN(p) || p <= 0 || isNaN(r) || r < 0 || isNaN(n) || n <= 0) {
    return res.status(400).json({ success: false, msg: "Invalid input values" });
  }

  let monthlyEmi, totalInterest, totalPayment;

  if (r === 0) {
    monthlyEmi = Math.round((p / n) * 100) / 100;
    totalPayment = p;
    totalInterest = 0;
  } else {
    const rPerMonth = r / 1200;
    const factor = Math.pow(1 + rPerMonth, n);
    monthlyEmi = Math.round(((p * rPerMonth * factor) / (factor - 1)) * 100) / 100;
    totalPayment = Math.round((monthlyEmi * n) * 100) / 100;
    totalInterest = Math.round((totalPayment - p) * 100) / 100;
  }

  const emiEntry = {
    amount: p,
    rate: r,
    months: n,
    monthlyEmi,
    totalInterest,
    totalPayment
  };

  const emiDetail = await EmiDb.findOne({ userId: req.params.userId });
  if (!emiDetail) {
    const userData = await EmiDb.create({
      userId: req.params.userId,
      emiHistory: [emiEntry],
    });
    res.status(200).json({
      success: true,
      msg: userData,
    });
  } else {
    emiDetail.emiHistory.push(emiEntry);
    const userResult = await emiDetail.save();
    res.status(200).json({
      success: true,
      msg: emiDetail,
    });
  }
});
