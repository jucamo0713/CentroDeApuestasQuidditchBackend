import {
    applyDecorators,
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
    SetMetadata,
} from '@nestjs/common';
import { isObservable, Observable, tap } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { resolveRequestsUtil } from '../utils';

const DONT_PRINT_REQUEST_METADATA_KEY: string = 'DONT_PRINT_REQUEST';

const DONT_PRINT_RESPONSE_METADATA_KEY: string = 'DONT_PRINT_RESPONSE';

const DONT_PRINT_LOGS_METADATA_KEY: string = 'DONT_PRINT_LOGS';

export function LoggerDecorator({
    printRequest = true,
    printResponse = true,
    printLogs = true,
}: {
    printLogs?: boolean;
    printRequest?: boolean;
    printResponse?: boolean;
}): MethodDecorator {
    return applyDecorators(
        SetMetadata(DONT_PRINT_REQUEST_METADATA_KEY, !printRequest),
        SetMetadata(DONT_PRINT_RESPONSE_METADATA_KEY, !printResponse),
        SetMetadata(DONT_PRINT_LOGS_METADATA_KEY, !printLogs),
    );
}

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    constructor(private readonly reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        if (!this.reflector.get(DONT_PRINT_LOGS_METADATA_KEY, context.getHandler())) {
            const logger: Logger = new Logger(context.getClass().name);
            const request = resolveRequestsUtil(context);
            const now = Date.now();
            const printData = !this.reflector.get(DONT_PRINT_REQUEST_METADATA_KEY, context.getHandler());
            if (isObservable(request)) {
                logger.log(`[${context.getHandler().name}] - INIT`);
                request.subscribe({
                    complete: () => {
                        logger.log(`[${context.getHandler().name}] - DATA COMPLETED AT ${Date.now() - now} ms`);
                    },
                    next: (data) => {
                        logger.log(
                            `[${context.getHandler().name}] - DATA ARRIVED AT ${Date.now() - now} ms - ${
                                printData ? `data: ${JSON.stringify(data)}` : ''
                            }`,
                        );
                    },
                });
            } else {
                logger.log(
                    `[${context.getHandler().name}] - INIT - ${
                        printData ? `data: ${JSON.stringify(resolveRequestsUtil(context))}` : ''
                    }`,
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
                        ),
                    ),
                );
        } else {
            return next.handle();
        }
    }
}
