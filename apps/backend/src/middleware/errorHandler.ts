import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export interface ApiError extends Error {
    statusCode?: number;
    code?: string;
}

/**
 * Custom error class for API errors
 */
export class HttpError extends Error implements ApiError {
    public statusCode: number;
    public code: string;

    constructor(statusCode: number, message: string, code?: string) {
        super(message);
        this.statusCode = statusCode;
        this.code = code || 'UNKNOWN_ERROR';
        this.name = 'HttpError';
    }
}

/**
 * Error handling middleware that catches and formats API errors consistently
 */
export function errorHandler(
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    // Default error values
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    let code = err.code || 'INTERNAL_ERROR';

    // Handle specific error types
    if (err.name === 'ValidationError') {
        statusCode = 400;
        code = 'VALIDATION_ERROR';
    } else if (err.name === 'CastError') {
        statusCode = 400;
        code = 'INVALID_FORMAT';
        message = 'Invalid data format';
    } else if (err.name === 'UnauthorizedError') {
        statusCode = 401;
        code = 'UNAUTHORIZED';
    }

    // Log the error
    logger.error(`${req.method} ${req.path} - ${statusCode} - ${message}`, {
        error: err.message,
        stack: err.stack,
        statusCode,
        code,
        method: req.method,
        path: req.path,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
    });

    // Send error response
    const errorResponse = {
        error: {
            code,
            message,
            statusCode,
        },
        timestamp: new Date().toISOString(),
        path: req.path,
        method: req.method,
    };

    // Don't expose stack trace in production
    if (process.env.NODE_ENV !== 'production' && err.stack) {
        (errorResponse.error as any).stack = err.stack;
    }

    res.status(statusCode).json(errorResponse);
}

/**
 * 404 Not Found handler for unmatched routes
 */
export function notFoundHandler(req: Request, res: Response, next: NextFunction): void {
    const error = new HttpError(404, `Route not found: ${req.path}`, 'ROUTE_NOT_FOUND');
    logger.error(`Route not found: ${req.method} ${req.path}`);
    next(error);
}

/**
 * Async error wrapper to catch errors in async route handlers
 */
export function asyncHandler(fn: Function) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
} 