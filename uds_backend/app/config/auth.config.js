const jwt = require('jsonwebtoken');
const secret = "abcTTT6543uzzzyyyuccccr434cvewqjhgder";
const db = require("../models");
const User = db.user;

const intercepterMiddleware = async (req, res, next) => {
  try {
    console.log('Incoming request intercepted:', req.method, req.url);
    if (checkWithoutLoginUrl(req)) {
      next();
    }
    else {
      let token = req.headers.authorization;
      if (token) {
        token = token?.split(" ")[1];
        const findTokan = await User.findOne({ where: { token: token } })
        if (!findTokan) {
          return res.status(409).json({ message: "Invalid token" });
        }
        let tokenDetail = jwt.verify(token, secret);
        console.log(tokenDetail);
        // req.body.employee_id = tokenDetail?.employee_id;
        next();
      }
      else {
        return res.status(401).json({ message: "Unauthorized User" });
      }
    }
  } catch (err) {
    console.log(err)
  }

}

const checkWithoutLoginUrl = (req) => {
  if ((req.url.includes("signin")
    || req.url.includes("getVendor_replyDataforBOM")
    || req.url.includes("getVendor_replyDataforService")
    || req.url.includes("getVendor_replyData")
    || req.url.includes("forgotSendOtp")
    || req.url.includes("forgotPassword")
  )) return true;
}

module.exports = {
  secret: secret,
  expiresIn: 60000000,
  authorization: intercepterMiddleware
};
