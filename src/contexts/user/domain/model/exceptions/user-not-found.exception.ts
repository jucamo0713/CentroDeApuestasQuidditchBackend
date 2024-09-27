import { UserErrorMessagesConstants } from './user-error-messages.constants';
import { HttpStatus } from '@nestjs/common';
import { ExceptionBase } from '../../../../core/domain/model/exceptions/exception-base';

export class UserNotFoundException extends ExceptionBase {
    constructor(
        location: string,
        message: UserErrorMessagesConstants = UserErrorMessagesConstants.USER_NOT_FOUND,
        status: HttpStatus = HttpStatus.NOT_FOUND,
    ) {
        super(location, message, status);
    }
}
