const {handleHttpError} = require('../helpers');

const validateUser = schema => {
  const func = (req, res, next)=> {

      if(Object.keys(req.body).length === 0) {
        next(handleHttpError(400, "missing fields"));
      }

      const {error} = schema.validate(req.body);
      if (error) {
        const validationErrors = error.details.map(detail => detail.message);
        next(handleHttpError(400, `${validationErrors.join(', ')}`));
      }
      else {
        next();
    }
  }
  return func;
}

module.exports = {
  validateUser, 
};