const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { createJWT } = require("../utils");
const CustomError = require("../errors");

// Register user
const register = async (req, res) => {
  const { email, name, password } = req.body;
  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists.");
  }

  // First registered user as admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, password, role });
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  const token = createJWT({ payload: tokenUser });

  const oneDay = 1000 * 60 * 60 * 24;

  // Sends token to cookies
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
  });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  res.send("logged");
};

const logout = async (req, res) => {
  res.send("logged out");
};

module.exports = {
  register,
  login,
  logout,
};
