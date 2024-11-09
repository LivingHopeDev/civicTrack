"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expired = exports.Unauthenticated = exports.ServerError = exports.routeNotFound = exports.ResourceNotFound = exports.InvalidInput = exports.HttpError = exports.Unauthorised = exports.errorHandler = exports.Conflict = exports.BadRequest = void 0;
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("../utils/logger"));
class HttpError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.success = false;
        this.name = this.constructor.name;
        this.status_code = statusCode;
    }
}
exports.HttpError = HttpError;
class BadRequest extends HttpError {
    constructor(message) {
        super(400, message);
    }
}
exports.BadRequest = BadRequest;
class ResourceNotFound extends HttpError {
    constructor(message) {
        super(404, message);
    }
}
exports.ResourceNotFound = ResourceNotFound;
class Unauthenticated extends HttpError {
    constructor(message) {
        super(401, message);
    }
}
exports.Unauthenticated = Unauthenticated;
class Unauthorised extends HttpError {
    constructor(message) {
        super(403, message);
    }
}
exports.Unauthorised = Unauthorised;
class Conflict extends HttpError {
    constructor(message) {
        super(409, message);
    }
}
exports.Conflict = Conflict;
class InvalidInput extends HttpError {
    constructor(message) {
        super(422, message);
    }
}
exports.InvalidInput = InvalidInput;
class Expired extends HttpError {
    constructor(message) {
        super(410, message);
    }
}
exports.Expired = Expired;
class ServerError extends HttpError {
    constructor(message) {
        super(500, message);
    }
}
exports.ServerError = ServerError;
const routeNotFound = (req, res, next) => {
    const message = `Route not found: ${req.originalUrl}`;
    res.status(404).json({ success: false, status: 404, message });
};
exports.routeNotFound = routeNotFound;
const errorHandler = (err, _req, res, _next) => {
    logger_1.default.error(err);
    const success = err.success !== undefined ? err.success : false;
    const status_code = err.status_code || 500;
    const message = err.message || "An unexpected error occurred";
    const cleanedMessage = message.replace(/"/g, "");
    if (config_1.default.NODE_ENV === "development") {
        logger_1.default.error("Error", err);
    }
    res.status(status_code).json({
        success,
        status_code,
        message: cleanedMessage,
    });
};
exports.errorHandler = errorHandler;
