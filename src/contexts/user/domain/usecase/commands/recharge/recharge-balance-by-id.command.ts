import { ICommand } from '@nestjs/cqrs';
import { UserId } from '../../../model/user.id';
import { Balance } from '../../../model/balance';

export class RechargeBalanceByIdCommand implements ICommand {
    constructor(
        public readonly userId: UserId,
        public readonly balance: Balance,
    ) {}
}
