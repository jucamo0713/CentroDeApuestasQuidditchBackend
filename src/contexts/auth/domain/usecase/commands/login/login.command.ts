import { Email } from '../../../../../user/domain/model/email';
import { ICommand } from '@nestjs/cqrs';

export class LoginCommand implements ICommand {
    constructor(
        public readonly email: Email,
        public readonly password: string,
    ) {}
}
