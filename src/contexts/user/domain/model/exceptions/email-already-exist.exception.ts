import { HttpStatus } from '@nestjs/common';
import { ExceptionBase } from '../../../../core/domain/model/exceptions/exception-base';
import { UserErrorMessagesConstants } from './user-error-messages.constants';

export class EmailAlreadyExistException extends ExceptionBase {
    constructor(
        location: string,
        message: UserErrorMessagesConstants = UserErrorMessagesConstants.EMAIL_ALREADY_EXIST,
        status: HttpStatus = HttpStatus.BAD_REQUEST,
    ) {
        super(location, message, status);
    }
}
