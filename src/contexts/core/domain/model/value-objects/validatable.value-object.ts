import { StringValueObject } from './string.value-object';

/**
 * A value object that represents objects whose structure can be verified in some way.
 */
export abstract class ValidatableValueObject extends StringValueObject {
    /**
     * @param value The raw value.
     */
    constructor(value: string) {
        super(value);
        this.validate(value);
    }

    /**
     * Validates if the provided value is valid.
     * @param {string} value The raw value.
     */
    protected abstract validate(value: string): void;
}
