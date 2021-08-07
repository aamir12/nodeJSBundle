const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  console.log("Error Handler");
  console.log(err);
  if (req.xhr || req.headers.accept.indexOf("json") > -1) {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.status(statusCode).json({
      status: false,
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  } else {
    if (res.statusCode === 404) {
      // send to 404 page
    }
  }
};

module.exports = { notFound, errorHandler };
