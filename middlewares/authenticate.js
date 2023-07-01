const jwt = require("jsonwebtoken");
const { User, Session } = require("../models");
const { handleHttpError } = require("../helpers");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(handleHttpError(401));
  }

  try {
    const { id, sid } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    const session = await Session.findById(sid);

    if (!user || !user.token || user.token !== token || !session) {
      next(handleHttpError(401));
    }

    req.user = user;
    next();
  } catch (error) {
    next(handleHttpError(401));
  }
};

module.exports = authenticate;