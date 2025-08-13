

const logger = (req, res, next) => {
  const start = Date.now(); // optional: track request time

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] :${req.method} :${
        req.originalUrl
      } - ${res.statusCode} (${duration}ms)`
    );
  });

  next(); // continue to the next middleware
};

export default logger
