import { NumberValueObject } from '../../../../core/domain/model/value-objects/number.value-object';
import { PaginationParamNotValidException } from '../exceptions/pagination-param-not-valid.exception';
import { SharedErrorMessagesConstants } from '../exceptions/shared-error-messages.constants';

/**
 * Represents a pagination param value object.
 */
export class PaginationParam extends NumberValueObject {
    /**
     * @param value The value to be assigned to the number value object.
     */
    constructor(value: number) {
        PaginationParam.ensureIsGreaterThanZero(value);
        super(value);
    }

    /**
     * Valid if a paging parameter complies with the necessary rules.
     * @param value - The value to be assigned to the number value object.
     * @throws {PaginationParamNotValidException} When the paging parameter entered is less than or equal to zero.
     */
    private static ensureIsGreaterThanZero(value: number): void {
        if (value <= 0)
            throw new PaginationParamNotValidException(
                PaginationParam.name,
                SharedErrorMessagesConstants.PAGINATION_PARAM_MUST_BE_GREATER_THAN_ZERO,
            );
    }
}
