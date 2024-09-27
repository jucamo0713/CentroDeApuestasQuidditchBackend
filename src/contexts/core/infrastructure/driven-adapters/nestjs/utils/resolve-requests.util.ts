import { ArgumentsHost } from '@nestjs/common';
import { Request } from 'express';

export function resolveRequestsUtil(context: ArgumentsHost): Promise<unknown> {
    switch (context.getType()) {
        case 'http': {
            const request = context.switchToHttp().getRequest<Request>();
            return request.method === 'GET' ? request.query : request.body;
        }
        case 'rpc': {
            return context.switchToRpc().getData();
        }
        default: {
            throw new Error('Context Not implemented');
        }
    }
}
