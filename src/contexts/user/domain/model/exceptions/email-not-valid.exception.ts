import { HttpStatus } from '@nestjs/common';
import { ExceptionBase } from '../../../../core/domain/model/exceptions/exception-base';
import { UserErrorMessagesConstants } from './user-error-messages.constants';

export class EmailNotValidException extends ExceptionBase {
    constructor(
        location: string,
        message: UserErrorMessagesConstants = UserErrorMessagesConstants.EMAIL_NOT_VALID,
        status: HttpStatus = HttpStatus.BAD_REQUEST,
    ) {
        super(location, message, status);
    }
}
