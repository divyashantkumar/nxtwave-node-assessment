import CustomError from "../errors/custom.error.js";
import { Error as MongooseError } from "mongoose";

// Handle specific MongoDB errors
export const handleMongoError = (err) => {
    if (err.name === 'CastError') {
        const e = new CustomError(400, `Invalid ${err.path}: ${err.value}`, err?.errors);
        return e.serializeErrors();
    }
    if (err.code === 11000) {
        const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
        const e = new CustomError(400, `Duplicate field value: ${value}. Please use another value!`, err?.errors);
        return e.serializeErrors();
    }
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(el => el.message);
        const e = new CustomError(400, `Invalid input data - ${errors.join('. ')}`, err?.errors);
        return e.serializeErrors();
    }
    const e = new CustomError(400, err?.message || 'Something went wrong', err?.errors);
    return e.serializeErrors();
};

export const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || 'Something went wrong!';

    if (err instanceof CustomError) {
        const e = new CustomError(errorMessage, statusCode, err?.errors);
        return res
            .status(e.statusCode)
            .json({ ...e.serializeErrors() });
    } else if (err instanceof MongooseError) {
        const serializeErrors = handleMongoError(err);
        return res
            .status(serializeErrors?.statusCode)
            .json({ ...serializeErrors });
    }

    return res.status(500).json({ status: 'error', message: 'Something went wrong! Internal Server Error', errors: err?.errors });
};

