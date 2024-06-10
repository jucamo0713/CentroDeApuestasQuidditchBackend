/**
 * Base class for representing string value objects.
 */
export class StringValueObject {
    /**
     * The value of the string value object.
     */
    protected readonly value: string;

    /**
     * Constructor for the StringValueObject class.
     * @param value - The value to be assigned to the string value object.
     */
    constructor(value: string) {
        this.value = value;
    }

    /**
     * Returns the string representation of the value object.
     * @returns The string representation of the value object.
     */
    public toString(): string {
        return this.value;
    }
}
