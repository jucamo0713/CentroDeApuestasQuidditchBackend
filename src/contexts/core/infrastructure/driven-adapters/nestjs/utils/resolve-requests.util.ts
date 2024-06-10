import { ArgumentsHost } from '@nestjs/common';
import { Request } from 'express';

/**
 * Resolves the request data from the given NestJS execution context.
 * @param context - The execution context from NestJS.
 * @returns A promise resolving to the request data.
 * @throws {Error} Throws an error if the context type is not supported.
 */
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
