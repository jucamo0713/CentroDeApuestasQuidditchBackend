import { PaginationParam } from './pagination-param';

/**
 * Class that represents the limit of elements that a paginated method must bring.
 */
export class PaginationLimit extends PaginationParam {
    /**
     * @param value - The number of elements that a page should have in a paginated method.
     */
    constructor(value: number) {
        super(Math.floor(value));
    }
}
