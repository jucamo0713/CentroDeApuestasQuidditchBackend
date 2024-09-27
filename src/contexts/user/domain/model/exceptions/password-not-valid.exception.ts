import { HttpStatus } from '@nestjs/common';
import { ExceptionBase } from '../../../../core/domain/model/exceptions/exception-base';
import { UserErrorMessagesConstants } from './user-error-messages.constants';

/**
 * Exception class representing the scenario when a password is not valid.
 */
export class PasswordNotValidException extends ExceptionBase {
    constructor(
        location: string,
        message: UserErrorMessagesConstants = UserErrorMessagesConstants.PASSWORD_NOT_VALID,
        status: HttpStatus = HttpStatus.BAD_REQUEST,
    ) {
        super(location, message, status);
    }
}
