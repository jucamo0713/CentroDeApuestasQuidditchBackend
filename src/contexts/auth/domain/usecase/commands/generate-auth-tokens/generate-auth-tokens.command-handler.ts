import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GenerateAuthTokensCommand } from './generate-auth-tokens.command';
import { AuthTokens } from '../../../model/auth-tokens';
import { AuthUseCase } from '../../auth.use-case';

@CommandHandler(GenerateAuthTokensCommand)
export class GenerateAuthTokensCommandHandler implements ICommandHandler<GenerateAuthTokensCommand, AuthTokens> {
    constructor(private readonly useCase: AuthUseCase) {}

    async execute(command: GenerateAuthTokensCommand): Promise<AuthTokens> {
        return this.useCase.generateAuthTokens(command.userId);
    }
}
