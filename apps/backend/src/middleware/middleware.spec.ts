import { Request, Response, NextFunction } from 'express';
import { errorHandler, notFoundHandler, HttpError } from './errorHandler';
import { requestLogger } from './requestLogger';
import { logger } from '../utils/logger';

// Mock the logger
jest.mock('../utils/logger', () => ({
    logger: {
        info: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
    },
}));

describe('Error Handler Middleware', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockRequest = {
            method: 'GET',
            path: '/api/test',
            ip: '127.0.0.1',
            get: jest.fn().mockReturnValue('test-user-agent'),
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
        jest.clearAllMocks();
    });

    describe('errorHandler', () => {
        it('should handle HttpError correctly', () => {
            const error = new HttpError(400, 'Test error', 'TEST_ERROR');

            errorHandler(error, mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    error: expect.objectContaining({
                        code: 'TEST_ERROR',
                        message: 'Test error',
                        statusCode: 400,
                    }),
                    timestamp: expect.any(String),
                    path: '/api/test',
                    method: 'GET',
                })
            );
            expect(logger.error).toHaveBeenCalled();
        });

        it('should handle generic errors with default values', () => {
            const error = new Error('Generic error');

            errorHandler(error, mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    error: expect.objectContaining({
                        code: 'INTERNAL_ERROR',
                        message: 'Generic error',
                        statusCode: 500,
                    }),
                    timestamp: expect.any(String),
                    path: '/api/test',
                    method: 'GET',
                })
            );
        });

        it('should handle ValidationError specifically', () => {
            const error = new Error('Validation failed');
            error.name = 'ValidationError';

            errorHandler(error, mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    error: expect.objectContaining({
                        code: 'VALIDATION_ERROR',
                        statusCode: 400,
                    }),
                })
            );
        });

        it('should include stack trace in non-production environment', () => {
            const originalEnv = process.env.NODE_ENV;
            process.env.NODE_ENV = 'development';

            const error = new Error('Test error');
            error.stack = 'Error stack trace';

            errorHandler(error, mockRequest as Request, mockResponse as Response, mockNext);

            const responseCall = (mockResponse.json as jest.Mock).mock.calls[0][0];
            expect(responseCall.error.stack).toBe('Error stack trace');

            process.env.NODE_ENV = originalEnv;
        });

        it('should not include stack trace in production environment', () => {
            const originalEnv = process.env.NODE_ENV;
            process.env.NODE_ENV = 'production';

            const error = new Error('Test error');
            error.stack = 'Error stack trace';

            errorHandler(error, mockRequest as Request, mockResponse as Response, mockNext);

            const responseCall = (mockResponse.json as jest.Mock).mock.calls[0][0];
            expect(responseCall.error.stack).toBeUndefined();

            process.env.NODE_ENV = originalEnv;
        });
    });

    describe('notFoundHandler', () => {
        it('should create 404 error and call next', () => {
            notFoundHandler(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(
                expect.objectContaining({
                    statusCode: 404,
                    message: 'Route not found: /api/test',
                    code: 'ROUTE_NOT_FOUND',
                })
            );
            expect(logger.error).toHaveBeenCalledWith('Route not found: GET /api/test');
        });
    });
});

describe('Request Logger Middleware', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: NextFunction;
    let originalEnd: Function;

    beforeEach(() => {
        mockRequest = {
            method: 'GET',
            url: '/api/test',
            path: '/api/test',
            query: { param: 'value' },
            ip: '127.0.0.1',
            get: jest.fn().mockReturnValue('test-user-agent'),
        };

        originalEnd = jest.fn();
        mockResponse = {
            end: originalEnd,
            statusCode: 200,
        };

        mockNext = jest.fn();
        jest.clearAllMocks();
    });

    describe('requestLogger', () => {
        it('should log incoming request', () => {
            requestLogger(mockRequest as Request, mockResponse as Response, mockNext);

            expect(logger.info).toHaveBeenCalledWith(
                'GET /api/test - Started',
                expect.objectContaining({
                    method: 'GET',
                    url: '/api/test',
                    path: '/api/test',
                    query: { param: 'value' },
                    ip: '127.0.0.1',
                    userAgent: 'test-user-agent',
                    timestamp: expect.any(String),
                })
            );
            expect(mockNext).toHaveBeenCalled();
        });

        it('should log response when request completes', () => {
            requestLogger(mockRequest as Request, mockResponse as Response, mockNext);

            // Simulate response completion
            mockResponse.statusCode = 200;
            (mockResponse.end as any)();

            expect(logger.info).toHaveBeenCalledWith(
                expect.stringMatching(/GET \/api\/test - 200 - \d+ms/),
                expect.objectContaining({
                    method: 'GET',
                    url: '/api/test',
                    path: '/api/test',
                    statusCode: 200,
                    responseTime: expect.any(Number),
                    ip: '127.0.0.1',
                    userAgent: 'test-user-agent',
                    timestamp: expect.any(String),
                })
            );
            expect(originalEnd).toHaveBeenCalled();
        });

        it('should measure response time correctly', () => {
            const startTime = Date.now();
            jest.spyOn(Date, 'now').mockReturnValueOnce(startTime).mockReturnValueOnce(startTime + 100);

            requestLogger(mockRequest as Request, mockResponse as Response, mockNext);
            (mockResponse.end as any)();

            expect(logger.info).toHaveBeenCalledWith(
                'GET /api/test - 200 - 100ms',
                expect.objectContaining({
                    responseTime: 100,
                })
            );
        });
    });
});

describe('HttpError Class', () => {
    it('should create HttpError with all properties', () => {
        const error = new HttpError(400, 'Test message', 'TEST_CODE');

        expect(error.statusCode).toBe(400);
        expect(error.message).toBe('Test message');
        expect(error.code).toBe('TEST_CODE');
        expect(error.name).toBe('HttpError');
    });

    it('should use default code when not provided', () => {
        const error = new HttpError(500, 'Test message');

        expect(error.code).toBe('UNKNOWN_ERROR');
    });
}); 