const validateSchema = schema => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return next(handleHttpError(400, "missing fields"));
    }

    const { error } = schema.validate(req.body);
    if (error) {
      const validationErrors = error.details.map(detail => detail.message);
      return next(handleHttpError(400, `${validationErrors.join(', ')}`));
    }

    next();
  }
  return func;
}

module.exports = validateSchema;