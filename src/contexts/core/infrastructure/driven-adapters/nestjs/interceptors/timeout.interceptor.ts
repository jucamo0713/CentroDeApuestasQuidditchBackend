import {
    applyDecorators,
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
    RequestTimeoutException,
    SetMetadata,
} from '@nestjs/common';
import { catchError, Observable, throwError, timeout, TimeoutError } from 'rxjs';
import { Reflector } from '@nestjs/core';
import process from 'node:process';

const TIMEOUT_METADATA_KEY: string = 'timeout_config';

const CANCEL_TIMEOUT_METADATA_KEY: string = 'CANCEL_TIMEOUT_METADATA_KEY';

export function TimeoutDecorator(timeout: number): MethodDecorator {
    return applyDecorators(SetMetadata(TIMEOUT_METADATA_KEY, timeout));
}

export function CancelTimeoutDecorator(): MethodDecorator {
    return applyDecorators(SetMetadata(CANCEL_TIMEOUT_METADATA_KEY, true));
}

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    constructor(
        private readonly reflector: Reflector,
        private readonly defaultServicesTimeout: number = Number(process.env.DEFAULT_TIMEOUT_MS),
    ) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const timeMs: number = this.reflector.get<number>(TIMEOUT_METADATA_KEY, context.getHandler());
        const cancelTimeout: boolean = this.reflector.get<boolean>(CANCEL_TIMEOUT_METADATA_KEY, context.getHandler());
        return cancelTimeout
            ? next.handle()
            : next.handle().pipe(
                  timeout(Number(timeMs ?? this.defaultServicesTimeout)),
                  catchError((err) => {
                      if (err instanceof TimeoutError) {
                          new Logger(context.getHandler().name).error(`${err.message} exceed ${timeMs}`);
                          return throwError(() => new RequestTimeoutException());
                      }
                      return throwError(() => err);
                  }),
              );
    }
}
