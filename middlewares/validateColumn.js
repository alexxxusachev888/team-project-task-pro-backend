const { columnSchemaJoi } = require('../models/column');
const handleHttpError = require('../helpers');

const validateColumn = (req, res, next) => {
    const { error } = columnSchemaJoi.validate(req.body);
    if (error) {
        next(handleHttpError(400, error.details[0].message));
    } else {
        next();
    }
}

module.exports = validateColumn;