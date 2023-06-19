const authenticate = require("./authenticate.js");
const { validateUser } = require("./validateUser.js");
const upload = require("./upload.js");

module.exports = {
  authenticate,
  validateUser,
  upload,
};
