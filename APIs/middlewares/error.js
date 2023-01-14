const catchAsync = func => {
  return (req, res, next) => {
    func(req, res, next).catch(error =>
      next({
        status: error.status || 500,
        message: error.message,
      }),
    );
  };
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'UNDIFINED ERROR';
  res.status(err.statusCode).json({ message: err.message });
};

module.exports = { catchAsync, globalErrorHandler };
