import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from '../../../../model/user';
import { UserUseCase } from '../../../user.use-case';
import { GetUserByIdQuery } from './get-user-by-id.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler implements IQueryHandler<GetUserByIdQuery, User> {
    constructor(private readonly useCase: UserUseCase) {}

    execute(query: GetUserByIdQuery): Promise<User> {
        return this.useCase.getById(query.userId);
    }
}
