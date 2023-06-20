const errorMessages = (label) => ({
    'string.base': `"${label}" should be a type of 'text'`,
    'string.empty': `"${label}" cannot be an empty field`,
    'any.required': `"${label}" is a required field`,
    'string.uri': `"${label}" must be a valid URL`,
  });
  
  module.exports = errorMessages;