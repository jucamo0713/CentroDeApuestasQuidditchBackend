import { ArgumentsHost } from '@nestjs/common';
import { ExceptionDto } from './exception.dto';
import {
    HttpArgumentsHost,
    RpcArgumentsHost,
    WsArgumentsHost,
} from '@nestjs/common/interfaces/features/arguments-host.interface';
import { Response } from 'express';

export function sendExceptionUtil(host: ArgumentsHost, mappedResponse: ExceptionDto): void {
    let context: RpcArgumentsHost | HttpArgumentsHost | WsArgumentsHost, response: Response;
    switch (host.getType()) {
        case 'http':
            context = host.switchToHttp();
            response = context.getResponse<Response>();
            response.status(mappedResponse.httpStatusCode).json(mappedResponse);
            break;
    }
}
