import { HttpStatus } from '@nestjs/common';
import { SharedErrorMessagesConstants } from './shared-error-messages.constants';
import { ExceptionBase } from '../../../../core/domain/model/exceptions/exception-base';

export class PaginationParamNotValidException extends ExceptionBase {
    constructor(
        location: string,
        message: SharedErrorMessagesConstants = SharedErrorMessagesConstants.PAGINATION_PARAM_NOT_VALID,
        status: HttpStatus = HttpStatus.BAD_REQUEST,
    ) {
        super(location, message, status);
    }
}
