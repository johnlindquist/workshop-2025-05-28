export enum LogLevel {
    ERROR = 0,
    WARN = 1,
    INFO = 2,
    DEBUG = 3,
}

const LOG_LEVEL_MAP: Record<string, LogLevel> = {
    error: LogLevel.ERROR,
    warn: LogLevel.WARN,
    info: LogLevel.INFO,
    debug: LogLevel.DEBUG,
};

class Logger {
    private level: LogLevel;

    constructor() {
        const envLevel = process.env.LOG_LEVEL?.toLowerCase() || 'info';
        this.level = LOG_LEVEL_MAP[envLevel] ?? LogLevel.INFO;
    }

    private shouldLog(level: LogLevel): boolean {
        return level <= this.level;
    }

    private formatMessage(level: string, message: string): string {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    }

    error(message: string): void {
        if (this.shouldLog(LogLevel.ERROR)) {
            console.error(this.formatMessage('error', message));
        }
    }

    warn(message: string): void {
        if (this.shouldLog(LogLevel.WARN)) {
            console.warn(this.formatMessage('warn', message));
        }
    }

    info(message: string): void {
        if (this.shouldLog(LogLevel.INFO)) {
            console.log(this.formatMessage('info', message));
        }
    }

    debug(message: string): void {
        if (this.shouldLog(LogLevel.DEBUG)) {
            console.log(this.formatMessage('debug', message));
        }
    }
}

export const logger = new Logger(); 