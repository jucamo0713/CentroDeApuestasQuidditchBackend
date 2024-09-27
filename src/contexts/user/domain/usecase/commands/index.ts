import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommandHandler } from './register/register-user.command-handler';

export const Commands: Type<ICommandHandler>[] = [RegisterUserCommandHandler];
