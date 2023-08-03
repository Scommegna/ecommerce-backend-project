const register = async (req, res) => {
  res.send("registered");
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
