import { ValidatableValueObject } from '../../../core/domain/model/value-objects/validatable.value-object';
import { isEmail } from 'class-validator';
import { EmailNotValidException } from './exceptions/email-not-valid.exception';

export class Email extends ValidatableValueObject {
    constructor(value: string) {
        super(value.toLowerCase().trim());
    }

    protected validate(value: string): void {
        if (!isEmail(value)) {
            throw new EmailNotValidException(Email.name);
        }
    }
}
