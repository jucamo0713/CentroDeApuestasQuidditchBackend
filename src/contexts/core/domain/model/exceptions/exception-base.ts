import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Base class for custom exceptions, extending the HttpException class from NestJS.
 */
export class ExceptionBase extends HttpException {
    /**
     * @param location The location where the exception occurred.
     * @param customMessage A custom message describing the exception.
     * @param statusCode The custom status code associated with the exception.
     * @param status The HTTP status code of the exception.
     * @param retry Flag determining whether to retry an exception.
     */
    constructor(
        public readonly location: string,
        public readonly customMessage: string,
        public readonly statusCode: number,
        status: HttpStatus,
        public readonly retry: boolean = false,
    ) {
        super({ location, message: customMessage, retry, statusCode }, status);
    }
}
