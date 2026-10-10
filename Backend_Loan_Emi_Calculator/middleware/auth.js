const jwt = require("jsonwebtoken");
const config = require("../config/config");

const verifyToken = (req, res, next) => {
  const token1 = req.headers["authorization"];
  jwt.verify(
    token1,
    config.secretKey,
    {
      algorithm: config.algorithm,
    },
    (err, decoded) => {
      if (err) {
        let errordata = {
          message: err.message,
          expiredAt: err.expiredAt,
        };
        return res.status(401).json({
          message: "Unauthorized Access",
        });
      }
      req.decoded = decoded;
      // console.log(decoded);
      next();
    }
  );
};

module.exports = verifyToken;
