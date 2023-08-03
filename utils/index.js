const { createJWT, isTokenValid, attachCookiesToResponse } = require("./jwt");

// Exports all utils functions
module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
