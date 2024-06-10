import {
    applyDecorators,
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    RequestTimeoutException,
    SetMetadata,
} from '@nestjs/common';
import { catchError, Observable, throwError, timeout, TimeoutError } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AppLogger } from '../logger/app.logger';
import { resolvePidUtil } from '../utils';

/**
 * Metadata key for storing timeout configuration.
 */
const TIMEOUT_METADATA_KEY: string = 'timeout_config';

/**
 * Metadata key to cancel the timeout interceptor.
 */
const CANCEL_TIMEOUT_METADATA_KEY: string = 'CANCEL_TIMEOUT_METADATA_KEY';

/**
 * Timeout decorator for handling method call timeouts.
 * @param timeout - Timeout value in milliseconds.
 * @returns The applied decorator.
 */
export function TimeoutDecorator(timeout: number): MethodDecorator {
    return applyDecorators(SetMetadata(TIMEOUT_METADATA_KEY, timeout));
}

/**
 * Decorator that determines that the timeout interceptor should be ignored.
 * @returns The applied decorator.
 */
export function CancelTimeoutDecorator(): MethodDecorator {
    return applyDecorators(SetMetadata(CANCEL_TIMEOUT_METADATA_KEY, true));
}

/**
 * Interceptor for handling timeouts in method calls.
 */
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    /**
     * @param reflector The reflector service.
     * @param defaultServicesTimeout Default timeout of the services.
     * @param [pidUtil] - The PID utility function.
     */
    constructor(
        private readonly reflector: Reflector,
        private readonly defaultServicesTimeout: number = 5000,
        private readonly pidUtil: (context: ExecutionContext, generate?: boolean) => string = resolvePidUtil,
    ) {}

    /**
     * Intercepts the method call and adds timeout handling.
     * @param context - The execution context.
     * @param next - The call handler.
     * @returns The observable with timeout handling.
     */
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const timeMs: number = this.reflector.get<number>(TIMEOUT_METADATA_KEY, context.getHandler());
        const cancelTimeout: boolean = this.reflector.get<boolean>(CANCEL_TIMEOUT_METADATA_KEY, context.getHandler());
        return cancelTimeout
            ? next.handle()
            : next.handle().pipe(
                  timeout(Number(timeMs ?? this.defaultServicesTimeout)),
                  catchError((err) => {
                      if (err instanceof TimeoutError) {
                          new AppLogger(context.getHandler().name).error(
                              `${err.message} exceed ${timeMs}`,
                              this.pidUtil(context),
                          );
                          return throwError(() => new RequestTimeoutException());
                      }
                      return throwError(() => err);
                  }),
              );
    }
}
