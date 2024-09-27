import { HttpStatus } from '@nestjs/common';
import { ExceptionBase } from '../../../../core/domain/model/exceptions/exception-base';
import { UserErrorMessagesConstants } from './user-error-messages.constants';

export class UsernameAlreadyExistException extends ExceptionBase {
    constructor(
        location: string,
        message: UserErrorMessagesConstants = UserErrorMessagesConstants.USERNAME_ALREADY_EXIST,
        status: HttpStatus = HttpStatus.BAD_REQUEST,
    ) {
        super(location, message, status);
    }
}
