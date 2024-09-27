import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from './get-user-by-email.query';
import { User } from '../../../../model/user';
import { UserUseCase } from '../../../user.use-case';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailQueryHandler implements IQueryHandler<GetUserByEmailQuery, User | undefined> {
    constructor(private readonly useCase: UserUseCase) {}

    execute(query: GetUserByEmailQuery): Promise<User | undefined> {
        return this.useCase.getByEmail(query.email, query.throwExceptionIfNotFound);
    }
}
