import { HttpStatus } from '@nestjs/common';
import { ExceptionBase } from '../../../../core/domain/model/exceptions/exception-base';
import { AuthErrorMessagesConstants } from './auth-error-messages.constants';

export class RefreshTokenNotValidException extends ExceptionBase {
    constructor(
        location: string,
        message: AuthErrorMessagesConstants = AuthErrorMessagesConstants.REFRESH_TOKEN_NOT_VALID,
        status: HttpStatus = HttpStatus.FORBIDDEN,
    ) {
        super(location, message, status);
    }
}
