import { StringValueObject } from '../../../core/domain/model/value-objects/string.value-object';
import { CryptoUseCase } from '../../../shared/domain/usecase/crypto.use-case';
import { PasswordNotValidException } from './exceptions/password-not-valid.exception';
import { UserId } from './user.id';
import * as process from 'node:process';

export class Password extends StringValueObject {
    private static readonly regexp: RegExp = new RegExp(/^(?=.*\d)(?=.*\p{Ll})(?=.*\p{Lu})(?=.*[^\p{L}\d])\S{8,}$/u);

    static generate(value: string, userId: UserId, validate: boolean = true): Password {
        if (validate) this.validate(value);
        return new Password(CryptoUseCase.hash(value, userId.toString(), process.env.USER_PASSWORD_HASH_SALT!));
    }

    static validate(value: string): void {
        if (!Password.regexp.test(value)) throw new PasswordNotValidException(Password.name);
    }

    /**
     * Valid object password with a value.
     * @param value - The value to compare the password with.
     * @returns boolean
     */
    public compare(value: Password): boolean {
        return value.toString() === this.value;
    }
}
