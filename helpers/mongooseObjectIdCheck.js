const ObjectId = require("mongoose").Types.ObjectId;

const mongooseObjectIdCheck = (id) => {
  if (ObjectId.isValid(id)) return true;
  else return false;
};

module.exports = mongooseObjectIdCheck;
