import { PaginationParam } from './pagination-param';

export class PaginationLimit extends PaginationParam {
    constructor(value: number) {
        super(Math.floor(value));
    }
}
