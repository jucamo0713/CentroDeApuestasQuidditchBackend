import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';

export const Commands: Type<ICommandHandler>[] = [];
