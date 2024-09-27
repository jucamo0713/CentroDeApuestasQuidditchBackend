import { UserId } from '../../../../model/user.id';
import { IQuery } from '@nestjs/cqrs';

export class GetUserByIdQuery implements IQuery {
    constructor(public readonly userId: UserId) {}
}
