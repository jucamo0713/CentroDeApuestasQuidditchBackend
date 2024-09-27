import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RefreshAuthTokensCommand } from './refresh-auth-tokens.command';
import { AuthTokens } from '../../../model/auth-tokens';
import { AuthUseCase } from '../../auth.use-case';

@CommandHandler(RefreshAuthTokensCommand)
export class RefreshAuthTokensCommandHandler implements ICommandHandler<RefreshAuthTokensCommand, AuthTokens> {
    constructor(private readonly useCase: AuthUseCase) {}

    execute(command: RefreshAuthTokensCommand): Promise<AuthTokens> {
        return this.useCase.refreshAuthTokens(command.refreshToken);
    }
}
