const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { handleHttpError } = require("../helpers");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(handleHttpError(401));
  }

  try {
    const { id, email } = jwt.verify(token, process.env.JWT_SECRET);

    let user;
    if (id) {
      user = await User.findById(id);
    } else if (email) {
      user = await User.findOne({ email });
    }

    if (!user || !user.token || user.token !== token) {
      next(handleHttpError(401));
    }

    req.user = user;
    next();
  } catch (error) {
    next(handleHttpError(401));
  }
};

module.exports = authenticate;