import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { AccessTokenData } from '../../../model/access-token-data';
import { AuthUseCase } from '../../auth.use-case';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand, AccessTokenData | null> {
    constructor(private readonly useCase: AuthUseCase) {}

    execute(command: LoginCommand): Promise<AccessTokenData | null> {
        return this.useCase.login(command.email, command.password);
    }
}
