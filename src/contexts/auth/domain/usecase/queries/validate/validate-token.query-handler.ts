import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ValidateTokenQuery } from './validate-token.query';
import { AccessTokenData } from '../../../model/access-token-data';
import { AuthUseCase } from '../../auth.use-case';

@QueryHandler(ValidateTokenQuery)
export class ValidateTokenQueryHandler implements IQueryHandler<ValidateTokenQuery, AccessTokenData | undefined> {
    constructor(private readonly useCase: AuthUseCase) {}

    execute(command: ValidateTokenQuery): Promise<AccessTokenData | undefined> {
        return this.useCase.validateToken(command.token);
    }
}
