import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ExceptionBase } from '../../../../domain/model/exceptions/exception-base';
import { ExceptionDto } from './exception.dto';
import { sendExceptionUtil } from './send-exception.util';

const INTERNAL_SERVER_ERROR: string = 'INTERNAL_SERVER_ERROR';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
    private logger: Logger = new Logger(AppExceptionFilter.name);

    constructor() {}

    public static resolveMessage(exception: unknown): string {
        let data: Array<string> | string = '';
        if (exception) {
            switch (typeof exception) {
                case 'object':
                    if ('response' in exception && exception['response']) {
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
                        data = Array.isArray(exception) ? exception : '';
                    }
                    break;
                case 'string':
                    return exception;
            }
            if (Array.isArray(data)) {
                return data?.join(', ');
            } else if (data !== '') {
                return data;
            }
            try {
                return JSON.stringify(exception);
            } catch (e) {
                return data;
            }
        } else {
            return '';
        }
    }

    public catch(exception: Error, host: ArgumentsHost): unknown {
        this.logger.error(JSON.stringify(exception));
        const response: ExceptionDto = new ExceptionDto();
        if (exception instanceof ExceptionBase) {
            this.logger.error(`[${this.catch.name}] ERROR :: CONTROLLED EXCEPTION OCCURRED IN ${exception.location}`);
            response.httpStatusCode = exception.getStatus();
            response.message = exception.message;
        } else if (exception instanceof HttpException) {
            this.logger.error(`[${this.catch.name}] ERROR :: CONTROLLED EXCEPTION OCCURRED `);
            response.httpStatusCode = exception.getStatus();
            response.message =
                AppExceptionFilter.resolveMessage(exception) ?? HttpErrorByCode[response.httpStatusCode]?.name;
        } else {
            this.logger.error(`[${this.catch.name}] ERROR :: UNCONTROLLED EXCEPTION OCCURRED`);
            response.message = AppExceptionFilter.resolveMessage(exception);
            response.httpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        response.timestamp = Date.now().toString();
        if (!response.message) response.message = INTERNAL_SERVER_ERROR;
        this.logger.error(`ERROR :: ${JSON.stringify(response)}`);
        return sendExceptionUtil(host, response);
    }
}
