import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ExceptionBase } from '../../../../domain/model/exceptions/exception-base';
import { AppLogger } from '../logger/app.logger';
import { resolvePidUtil } from '../utils';
import { ExceptionDto } from './exception.dto';
import { sendExceptionUtil } from './send-exception.util';

/**
 * Message that is thrown by default if there is no exception.
 */
const INTERNAL_SERVER_ERROR: string = 'INTERNAL_SERVER_ERROR';

/**
 * Exception filter for handling NestJS exceptions and providing standardized error responses.
 */
@Catch()
export class AppExceptionFilter implements ExceptionFilter {
    private logger: AppLogger = new AppLogger(AppExceptionFilter.name);

    /**
     * @param appName The name of the application which has the exception filter.
     * @param exceptionUtil The utility to send exceptions to the client.
     * @param pidUtil The utility to resolve the PID for the exception.
     */
    constructor(
        private readonly appName: string,
        private readonly exceptionUtil: (
            host: ArgumentsHost,
            mappedResponse: ExceptionDto,
        ) => unknown = sendExceptionUtil,
        private readonly pidUtil: (context: ArgumentsHost, generate?: boolean) => string = resolvePidUtil,
    ) {}

    /**
     * Resolves the error message from various types of exceptions.
     * @param exception - The exception to resolve the message from.
     * @returns The resolved error message.
     */
    public static resolveMessage(exception: unknown): string {
        let data: Array<string> | string = null;
        switch (typeof exception) {
            case 'object':
                if ('response' in exception) {
                    if (typeof exception.response === 'object' && 'message' in exception.response) {
                        data = Array.isArray(exception.response.message)
                            ? exception.response.message
                            : String(exception.response.message);
                    } else {
                        data = Array.isArray(exception.response) ? exception.response : String(exception.response);
                    }
                } else if ('message' in exception) {
                    data = Array.isArray(exception.message) ? exception.message : String(exception.message);
                } else {
                    data = Array.isArray(exception) ? exception : null;
                }
                break;
            case 'string':
                return exception;
        }
        if (Array.isArray(data)) {
            return data?.join(', ');
        } else if (typeof data === 'string') {
            return data;
        }
        try {
            return JSON.stringify(exception);
        } catch (e) {
            return data;
        }
    }

    /**
     * Handles exceptions caught by NestJS and provides standardized error responses.
     * @param exception - The exception caught by NestJS.
     * @param host - The context host of the execution.
     * @returns The response based on the host type.
     */
    public catch(exception: Error, host: ArgumentsHost): unknown {
        const PID: string = this.pidUtil(host);
        this.logger.error(JSON.stringify(exception), PID);
        const response: ExceptionDto = new ExceptionDto();
        response.retry = false;
        if (exception instanceof ExceptionBase) {
            this.logger.error(
                `[${this.catch.name}] ERROR :: CONTROLLED EXCEPTION OCCURRED IN ${exception.location}`,
                PID,
            );
            response.statusCode = exception.statusCode;
            response.httpStatusCode = exception.getStatus();
            response.message = exception.message;
            response.retry = exception.retry;
        } else if (exception instanceof HttpException) {
            this.logger.error(`[${this.catch.name}] ERROR :: CONTROLLED EXCEPTION OCCURRED `, PID);
            response.statusCode = exception.getStatus();
            response.httpStatusCode = exception.getStatus();
            response.message =
                AppExceptionFilter.resolveMessage(exception) ?? HttpErrorByCode[response.httpStatusCode]?.name;
        } else if ('statusCode' in exception) {
            return this.exceptionUtil(host, exception as unknown as ExceptionDto);
        } else if (
            'details' in exception &&
            typeof exception.details === 'string' &&
            new RegExp('"protocolType":\\s*"grpc"', 'g').test(exception.details)
        ) {
            return this.exceptionUtil(host, JSON.parse(exception.details).mappedResponse);
        } else {
            this.logger.error(`[${this.catch.name}] ERROR :: UNCONTROLLED EXCEPTION OCCURRED`, PID);
            response.message = AppExceptionFilter.resolveMessage(exception);
            response.httpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        response.timestamp = Date.now().toString();
        response.pid = PID;
        response.appName = this.appName;
        if (!response.message) response.message = INTERNAL_SERVER_ERROR;
        this.logger.error(`ERROR :: ${JSON.stringify(response)}`, PID);
        return this.exceptionUtil(host, response);
    }
}
