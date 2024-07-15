const jwt = require("jsonwebtoken");

const encodeJWT = async (payload) =>
  jwt.sign(payload, process.env.APP_SECRET, { expiresIn: "24h" });

const decodeJWT = async (token) => jwt.verify(token, process.env.APP_SECRET);

module.exports = { encodeJWT, decodeJWT };
