import { HttpStatus } from '@nestjs/common';
import { SharedErrorMessagesConstants } from './shared-error-messages.constants';
import { ExceptionBase } from '../../../../core/domain/model/exceptions/exception-base';
import { ErrorCodesConstants } from './error-codes.constants';

/**
 * Exception class representing the scenario when a paging parameter is invalid.
 */
export class PaginationParamNotValidException extends ExceptionBase {
    /**
     * @param location - The location where the exception occurred.
     * @param [message] - The custom message describing the exception.
     * @param [status] - The HTTP status code of the exception.
     */
    constructor(
        location: string,
        message: SharedErrorMessagesConstants = SharedErrorMessagesConstants.PAGINATION_PARAM_NOT_VALID,
        status: HttpStatus = HttpStatus.BAD_REQUEST,
    ) {
        super(location, message, ErrorCodesConstants[message], status);
    }
}
