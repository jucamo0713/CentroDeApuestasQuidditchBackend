/**
 * Base class for representing number value objects.
 */
export class NumberValueObject {
    /**
     * The value of the number value object.
     */
    protected readonly value: number;

    /**
     * @param value - The value to be assigned to the number value object.
     */
    constructor(value: number) {
        this.value = value;
    }

    /**
     * Returns the string representation of the value object.
     * @returns The number representation of the value object.
     */
    public toNumber(): number {
        return this.value;
    }
}
