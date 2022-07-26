"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initErrorMiddleware = exports.notFoundMiddleware = void 0;
const http_1 = require("http");
function getErrorMessage(error) {
    if (error.stack) {
        return error.stack;
    }
    if (typeof error.toString === "function") {
        return error.toString();
    }
    return "";
}
function isErrorStatusCode(statusCode) {
    return statusCode >= 400 && statusCode <= 600;
}
function getHttpStatusCode(error, response) {
    const statusCodeFromError = error.status || error.statusCode;
    if (statusCodeFromError && isErrorStatusCode(statusCodeFromError)) {
        return statusCodeFromError;
    }
    const statusCodeFromResponse = response.statusCode;
    if (isErrorStatusCode(statusCodeFromResponse)) {
        return statusCodeFromResponse;
    }
    return 500;
}
const notFoundMiddleware = (request, response, next) => {
    response.status(404);
    next(`Cannot ${request.method}-${request.path}`);
};
exports.notFoundMiddleware = notFoundMiddleware;
function initErrorMiddleware(appEnvironment) {
    return function initErrorMiddleware(error, request, response, next) {
        const errorMessage = getErrorMessage(error);
        if (appEnvironment != "test") {
            console.error(errorMessage);
        }
        if (response.headersSent) {
            return next(error);
        }
        const statusCode = getHttpStatusCode(error, response);
        const errorResponse = {
            statusCode,
            error: http_1.STATUS_CODES[statusCode + ""],
            message: ""
        };
        if (appEnvironment !== "production") {
            errorResponse.message = errorMessage;
        }
        response.status(errorResponse.statusCode).json(errorResponse);
        next();
    };
}
exports.initErrorMiddleware = initErrorMiddleware;
