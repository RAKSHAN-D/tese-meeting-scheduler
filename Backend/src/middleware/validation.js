module.exports = function validate(schema, source = "body") {
  return (req, res, next) => {
    if (!schema) {
      return next();
    }

    const result = schema(req[source]);

    if (result === true || result?.success) {
      return next();
    }

    return res.status(400).json({
      ok: false,
      message: result?.message || "Validation failed",
    });
  };
};
