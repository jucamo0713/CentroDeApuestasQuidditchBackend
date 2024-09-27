import { UserId } from '../../../../../user/domain/model/user.id';
import { ICommand } from '@nestjs/cqrs';

export class GenerateAuthTokensCommand implements ICommand {
    constructor(public readonly userId: UserId) {}
}
