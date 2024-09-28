import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserUseCase } from '../../user.use-case';
import { RechargeBalanceByIdCommand } from './recharge-balance-by-id.command';
import { Balance } from '../../../model/balance';

@CommandHandler(RechargeBalanceByIdCommand)
export class RechargeBalanceByIdCommandHandler implements ICommandHandler<RechargeBalanceByIdCommand, Balance> {
    constructor(private readonly useCase: UserUseCase) {}

    execute(command: RechargeBalanceByIdCommand): Promise<Balance> {
        return this.useCase.rechargeById(command.userId, command.balance);
    }
}
