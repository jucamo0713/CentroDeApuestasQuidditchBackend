import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from './register-user.command';
import { UserUseCase } from '../../user.use-case';
import { AuthTokens } from '../../../../../auth/domain/model/auth-tokens';

@CommandHandler(RegisterUserCommand)
export class RegisterUserCommandHandler implements ICommandHandler<RegisterUserCommand, AuthTokens> {
    constructor(private readonly useCase: UserUseCase) {}

    execute(command: RegisterUserCommand): Promise<AuthTokens> {
        return this.useCase.signup(command.email, command.username, command.fullName, command.password);
    }
}
