import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { GenerateAuthTokensCommandHandler } from './generate-auth-tokens/generate-auth-tokens.command-handler';
import { LoginCommandHandler } from './login/login.command-handler';
import { RefreshAuthTokensCommandHandler } from './refresh-auth-tokens/refresh-auth-tokens.command-handler';

export const Commands: Type<ICommandHandler>[] = [
    GenerateAuthTokensCommandHandler,
    RefreshAuthTokensCommandHandler,
    LoginCommandHandler,
];
