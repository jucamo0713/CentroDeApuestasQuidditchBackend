import { Email } from './email';
import { UserId } from './user.id';
import { Password } from './password';

export class User {
    constructor(
        private readonly _userId: UserId,
        private readonly _email: Email,
        private readonly _fullName: string,
        private readonly _username: string,
        private _password: Password,
    ) {}

    get userId(): UserId {
        return this._userId;
    }

    get email(): Email {
        return this._email;
    }

    get fullName(): string {
        return this._fullName;
    }

    get username(): string {
        return this._username;
    }

    get password(): Password {
        return this._password;
    }

    set password(value: Password) {
        this._password = value;
    }
}
