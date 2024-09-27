import { IQuery } from '@nestjs/cqrs';

export class ValidateTokenQuery implements IQuery {
    constructor(public readonly token: string) {}
}
