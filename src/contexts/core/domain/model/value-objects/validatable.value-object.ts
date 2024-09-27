import { StringValueObject } from './string.value-object';

export abstract class ValidatableValueObject extends StringValueObject {
    constructor(value: string) {
        super(value);
        this.validate(value);
    }

    protected abstract validate(value: string): void;
}
