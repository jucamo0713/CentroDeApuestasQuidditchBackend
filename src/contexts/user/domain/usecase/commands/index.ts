import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommandHandler } from './register/register-user.command-handler';
import { RechargeBalanceByIdCommandHandler } from './recharge/recharge-balance-by-id.command-handler';

export const Commands: Type<ICommandHandler>[] = [RegisterUserCommandHandler, RechargeBalanceByIdCommandHandler];
