export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
}

export const asyncError = (passFunction) => (req, res, next) => {
    Promise.resolve(passFunction(req, res, next)).catch(next);
};