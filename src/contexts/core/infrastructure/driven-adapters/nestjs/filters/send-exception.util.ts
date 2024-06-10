import { ArgumentsHost } from '@nestjs/common';
import { ExceptionDto } from './exception.dto';
import {
    HttpArgumentsHost,
    RpcArgumentsHost,
    WsArgumentsHost,
} from '@nestjs/common/interfaces/features/arguments-host.interface';
import { Response } from 'express';
import { of, throwError } from 'rxjs';
import { KafkaContext } from '@nestjs/microservices';

/**
 * Sends the error response based on the host type.
 * @param host - The execution context host.
 * @param mappedResponse - The mapped error response.
 * @returns The response based on the host type.
 */
export function sendExceptionUtil(host: ArgumentsHost, mappedResponse: ExceptionDto): unknown {
    let context: RpcArgumentsHost | HttpArgumentsHost | WsArgumentsHost, response: Response;
    switch (host.getType()) {
        case 'http':
            context = host.switchToHttp();
            response = context.getResponse<Response>();
            response.status(mappedResponse.httpStatusCode).json(mappedResponse);
            break;
        case 'rpc': {
            const ctx = host.switchToRpc().getContext();
            if (ctx instanceof KafkaContext && !mappedResponse.retry) {
                return of(true);
            }
            if (
                'get' in ctx &&
                ctx.get('user-agent') &&
                (Array.isArray(ctx.get('user-agent'))
                    ? ctx.get('user-agent')[0]?.toString()
                    : ctx.get('user-agent')?.toString()
                )
                    ?.toLowerCase()
                    .includes('grpc')
            ) {
                return throwError(() => {
                    return {
                        code: 13,
                        details: JSON.stringify({
                            mappedResponse,
                            protocolType: 'grpc',
                        }),
                    };
                });
            }
            return throwError(() => mappedResponse);
        }
    }
}
