import { HttpException, HttpStatus } from '@nestjs/common';

export class ExceptionBase extends HttpException {
    constructor(
        public readonly location: string,
        public readonly customMessage: string,
        status: HttpStatus,
        public readonly retry: boolean = false,
    ) {
        super({ location, message: customMessage, retry }, status);
    }
}
