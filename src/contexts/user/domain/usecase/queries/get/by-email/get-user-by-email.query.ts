import { Email } from '../../../../model/email';
import { IQuery } from '@nestjs/cqrs';

export class GetUserByEmailQuery implements IQuery {
    constructor(
        public readonly email: Email,
        public readonly throwExceptionIfNotFound?: boolean,
    ) {}
}
