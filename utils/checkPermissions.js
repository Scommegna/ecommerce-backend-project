const CustomError = require("../errors");

// Check permissions of current user
const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.role === "admin") return;

  if (requestUser.userId === resourceUserId.toString()) return;

  throw new CustomError.UnauthorizedError(
    "Not authorized to access this route."
  );
};

module.exports = checkPermissions;
