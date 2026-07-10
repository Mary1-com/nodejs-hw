export const errorHandler = (err, req, res, _next) => {
  const status = err.status || err.statusCode || 500;

  res.status(status).json({
    message: err.message || 'Internal Server Error',
  });
};
