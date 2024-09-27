import { NumberValueObject } from '../../../../core/domain/model/value-objects/number.value-object';
import { PaginationParamNotValidException } from '../exceptions/pagination-param-not-valid.exception';
import { SharedErrorMessagesConstants } from '../exceptions/shared-error-messages.constants';

export class PaginationParam extends NumberValueObject {
    constructor(value: number) {
        PaginationParam.ensureIsGreaterThanZero(value);
        super(value);
    }

    private static ensureIsGreaterThanZero(value: number): void {
        if (value <= 0)
            throw new PaginationParamNotValidException(
                PaginationParam.name,
                SharedErrorMessagesConstants.PAGINATION_PARAM_MUST_BE_GREATER_THAN_ZERO,
            );
    }
}
