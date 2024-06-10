import { ConsoleLogger } from '@nestjs/common';

/**
 * Customized logger class that extends the NestJS Logger.
 */
export class AppLogger extends ConsoleLogger {
    /**
     * The process ID (PID) associated with the logger.
     */
    public pid: string;

    /**
     * Builds the log context with the process ID (PID).
     * @param pid - The process ID.
     * @param [context] - The log context.
     * @returns The constructed log context.
     */
    private buildContext(pid: string, context?: string): string {
        return this.context ? `${context ?? this.context}] [PID: ${pid ?? this.pid}` : pid;
    }

    /**
     * Logs a message with the 'log' level.
     * @param message - The log message.
     * @param pid - The process ID.
     * @param [context] - The log context.
     */
    log(message: unknown, pid: string, context?: string): void {
        super.log(message, this.buildContext(pid, context));
    }

    /**
     * Logs an error message with the 'error' level.
     * @param message - The error message.
     * @param pid - The process ID.
     * @param [stack] - The error stack trace.
     * @param [context] - The log context.
     */
    error(message: unknown, pid: string, stack?: string, context?: string): void {
        super.error(message, stack, this.buildContext(pid, context));
    }

    /**
     * Logs a debug message with the 'debug' level.
     * @param message - The debug message.
     * @param pid - The process ID.
     * @param [context] - The log context.
     */
    debug(message: unknown, pid: string, context?: string): void {
        super.debug(message, this.buildContext(pid, context));
    }

    /**
     * Logs a warning message with the 'warn' level.
     * @param message - The warning message.
     * @param pid - The process ID.
     * @param [context] - The log context.
     */
    warn(message: unknown, pid: string, context?: string): void {
        super.warn(message, this.buildContext(pid, context));
    }

    /**
     * Logs a verbose message with the 'verbose' level.
     * @param message - The verbose message.
     * @param pid - The process ID.
     * @param [context] - The log context.
     */
    verbose(message: unknown, pid: string, context?: string): void {
        super.verbose(message, this.buildContext(pid, context));
    }

    /**
     * Logs an info message with the 'debug' level.
     * @param message - The info message.
     * @param pid - The process ID.
     * @param [context] - The log context.
     */
    info(message: unknown, pid: string, context?: string): void {
        super.debug(message, this.buildContext(pid, context));
    }
}
