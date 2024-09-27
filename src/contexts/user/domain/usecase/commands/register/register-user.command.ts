import { ICommand } from '@nestjs/cqrs';
import { Email } from '../../../model/email';
import { Password } from '../../../model/password';

export class RegisterUserCommand implements ICommand {
    constructor(
        public readonly email: Email,
        public readonly username: string,
        public readonly fullName: string,
        public readonly password: Password,
    ) {}
}
