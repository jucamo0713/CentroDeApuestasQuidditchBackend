/**
 * Allows to filter iterable parameters containing an element.
 */
export class InFilterElement<T> {
    public readonly data: Array<T>;

    /**
     * @param data The data in the filter element.
     */
    constructor(data: Array<T>) {
        this.data = data;
    }
}
