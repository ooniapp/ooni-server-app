const jwt = require("jsonwebtoken");
const result = require("dotenv").config();

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res
        .status(403)
        .send({ auth: false, message: "No token provided." });
    }
    /*if (result.error) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token."+result.error.message });
    }*/
    const env = result.parsed;
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (!user) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
    req.userId = user.id;
    return next();
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ auth: false, message: "Failed to authenticate token." });
  }
};

module.exports = {
  verifyToken
};
