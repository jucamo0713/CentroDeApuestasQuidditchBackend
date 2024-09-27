import { ICommand } from '@nestjs/cqrs';

export class RefreshAuthTokensCommand implements ICommand {
    constructor(public readonly refreshToken: string) {}
}
