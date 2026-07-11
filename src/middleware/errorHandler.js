import createHttpError from 'http-errors';

export const errorHandler = (err, req, res, _next) => {
  if (createHttpError.isHttpError(err)) {
    res.status(err.status).json({
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    message: err.message || 'Internal Server Error',
  });
};
