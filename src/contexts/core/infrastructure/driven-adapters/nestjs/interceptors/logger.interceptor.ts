import {
    applyDecorators,
    ArgumentsHost,
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    SetMetadata,
} from '@nestjs/common';
import { isObservable, Observable, tap } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { resolvePidUtil, resolveRequestsUtil } from '../utils';
import { AppLogger } from '../logger/app.logger';

/**
 * Metadata key for not printing request data.
 */
const DONT_PRINT_REQUEST_METADATA_KEY: string = 'DONT_PRINT_REQUEST';

/**
 * Metadata key for not printing response data.
 */
const DONT_PRINT_RESPONSE_METADATA_KEY: string = 'DONT_PRINT_RESPONSE';

/**
 * Metadata key for not printing logs
 */
const DONT_PRINT_LOGS_METADATA_KEY: string = 'DONT_PRINT_LOGS';

/**
 * Decorator factory function to configure the LoggerDecorator method decorator.
 * @param printRequest - Whether to print request data.
 * @param printResponse - Whether to print response data.
 * @param printLogs - Whether to print logs.
 * @returns Method decorator with specified metadata.
 */
export function LoggerDecorator(
    printRequest: boolean = true,
    printResponse: boolean = true,
    printLogs: boolean = true,
): MethodDecorator {
    return applyDecorators(
        SetMetadata(DONT_PRINT_REQUEST_METADATA_KEY, !printRequest),
        SetMetadata(DONT_PRINT_RESPONSE_METADATA_KEY, !printResponse),
        SetMetadata(DONT_PRINT_LOGS_METADATA_KEY, !printLogs),
    );
}

/**
 * Logger interceptor for handling request and response logging.
 */
@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    /**
     * @param reflector - The NestJS reflector.
     * @param [pidUtil]
     * Useful for solving the pid.
     * @param [requestUtil]
     * Useful to solve the request.
     */
    constructor(
        private readonly reflector: Reflector,
        private readonly pidUtil: (context: ArgumentsHost, generate?: boolean) => string = resolvePidUtil,
        private readonly requestUtil: (context: ArgumentsHost) => Promise<unknown> = resolveRequestsUtil,
    ) {}

    /**
     * Intercepts the execution context and handles request and response logging.
     * @param context - The execution context.
     * @param next - The call handler.
     * @returns An observable of the intercepted values.
     */
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        if (!this.reflector.get(DONT_PRINT_LOGS_METADATA_KEY, context.getHandler())) {
            const PID = this.pidUtil(context);
            const logger: AppLogger = new AppLogger(context.getClass().name);
            const request = this.requestUtil(context);
            const now = Date.now();
            const printData = !this.reflector.get(DONT_PRINT_REQUEST_METADATA_KEY, context.getHandler());
            if (isObservable(request)) {
                logger.log(`[${context.getHandler().name}] - INIT`, PID);
                request.subscribe({
                    complete: () => {
                        logger.log(`[${context.getHandler().name}] - DATA COMPLETED AT ${Date.now() - now} ms`, PID);
                    },
                    next: (data) => {
                        logger.log(
                            `[${context.getHandler().name}] - DATA ARRIVED AT ${Date.now() - now} ms - ${
                                printData ? `data: ${JSON.stringify(data)}` : ''
                            }`,
                            PID,
                        );
                    },
                });
            } else {
                logger.log(
                    `[${context.getHandler().name}] - INIT - ${
                        printData ? `data: ${JSON.stringify(this.requestUtil(context))}` : ''
                    }`,
                    PID,
                );
            }
            return next
                .handle()
                .pipe(
                    tap((value: unknown) =>
                        logger.log(
                            `[${context.getHandler().name}] - FINISH - in: ${Date.now() - now}ms - ${
                                !this.reflector.get(DONT_PRINT_RESPONSE_METADATA_KEY, context.getHandler())
                                    ? `response: ${JSON.stringify(value)}`
                                    : ''
                            }`,
                            PID,
                        ),
                    ),
                );
        } else {
            return next.handle();
        }
    }
}
