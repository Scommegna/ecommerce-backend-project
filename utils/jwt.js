const jwt = require("jsonwebtoken");

// creates JWT
const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return token;
};

// Checks if given token is valid
const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
  createJWT,
  isTokenValid,
};
