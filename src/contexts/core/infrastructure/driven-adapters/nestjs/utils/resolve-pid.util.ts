import { ArgumentsHost, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { v4 as uuid } from 'uuid';

/**
 * Resolves the process ID (PID) from the given NestJS execution context.
 * @param context - The execution context from NestJS.
 * @param [generate] - A flag indicating whether to generate a new PID if not present.
 * @returns The resolved or generated process ID (PID).
 * @throws {Error} Throws an error if the context type is not supported.
 */
export function resolvePidUtil(context: ArgumentsHost, generate: boolean = true): string {
    switch (context.getType()) {
        case 'http': {
            const contextHttp = context.switchToHttp();
            const headers = contextHttp.getRequest<Request>().headers;
            headers.pid = headers.pid ?? headers.PID ?? (generate ? uuid() : undefined);
            return headers.pid as string;
        }
        case 'rpc': {
            const contextRpc = context.switchToRpc();
            const data = contextRpc.getData();
            const metadata = contextRpc.getContext();
            let pid: string;
            if ('get' in metadata && 'set' in metadata) {
                pid =
                    (Array.isArray(metadata.get('pid'))
                        ? metadata.get('pid')[0]?.toString()
                        : metadata.get('pid')?.toString()) ??
                    (Array.isArray(metadata.get('PID'))
                        ? metadata.get('PID')[0]?.toString()
                        : metadata.get('PID')?.toString()) ??
                    metadata.pid ??
                    metadata.PID ??
                    data.pid ??
                    data.PID ??
                    (generate ? uuid() : undefined);
                metadata.set('pid', pid);
            }
            metadata.pid =
                pid ?? metadata.pid ?? metadata.PID ?? data.pid ?? data.PID ?? (generate ? uuid() : undefined);
            return metadata.pid as string;
        }
        default:
            throw new Error(`Not implemented for ${context.getType()}`);
    }
}

/**
 * Parameter decorator for injecting the process ID (PID) into route handlers.
 */
export const GetPID = createParamDecorator((data: unknown, context: ExecutionContext): string => {
    return resolvePidUtil(context, false);
});
