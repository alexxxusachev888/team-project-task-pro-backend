const handleMongooseError = (error, data, next)=> {
    const {name, code} = error;
    const statusErorr = (name === 'MongoServerError' && code === 11000) ? 409 : 400;
    error.status = statusErorr;
    next();
}

module.exports = handleMongooseError;