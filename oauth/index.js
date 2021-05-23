const jwt = require("jsonwebtoken");
const result = require("dotenv").config();
const knex = require('../db');

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
    const userInfo = await knex('users').where({id:user.id}).select('name', 'id').first();
    req.userId = user.id;
    req.userName = userInfo.name
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
