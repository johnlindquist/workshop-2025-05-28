import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

/**
 * Request logging middleware that logs all incoming requests
 * with timestamps, methods, URLs, and response times
 */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
    const startTime = Date.now();
    const timestamp = new Date().toISOString();

    // Log the incoming request
    logger.info(`${req.method} ${req.url} - Started`, {
        method: req.method,
        url: req.url,
        path: req.path,
        query: req.query,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        timestamp,
    });

    // Override res.end to capture response time and status
    const originalEnd = res.end;
    res.end = function (chunk?: any, encoding?: any) {
        const responseTime = Date.now() - startTime;
        const statusCode = res.statusCode;

        // Log the completed request
        logger.info(`${req.method} ${req.url} - ${statusCode} - ${responseTime}ms`, {
            method: req.method,
            url: req.url,
            path: req.path,
            statusCode,
            responseTime,
            ip: req.ip,
            userAgent: req.get('User-Agent'),
            timestamp: new Date().toISOString(),
        });

        // Call the original end method
        originalEnd.call(this, chunk, encoding);
    };

    next();
}

/**
 * Enhanced request logger with additional details for debugging
 */
export function detailedRequestLogger(req: Request, res: Response, next: NextFunction): void {
    const startTime = Date.now();
    const timestamp = new Date().toISOString();

    // Log detailed request information
    logger.debug(`Incoming request: ${req.method} ${req.url}`, {
        method: req.method,
        url: req.url,
        path: req.path,
        query: req.query,
        headers: req.headers,
        body: req.body,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        timestamp,
    });

    // Override res.end to capture response details
    const originalEnd = res.end;
    res.end = function (chunk?: any, encoding?: any) {
        const responseTime = Date.now() - startTime;
        const statusCode = res.statusCode;

        // Log detailed response information
        logger.debug(`Response sent: ${req.method} ${req.url} - ${statusCode}`, {
            method: req.method,
            url: req.url,
            path: req.path,
            statusCode,
            responseTime,
            headers: res.getHeaders(),
            ip: req.ip,
            userAgent: req.get('User-Agent'),
            timestamp: new Date().toISOString(),
        });

        // Call the original end method
        originalEnd.call(this, chunk, encoding);
    };

    next();
} 