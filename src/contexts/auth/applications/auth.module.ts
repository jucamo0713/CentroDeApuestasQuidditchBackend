import { Module } from '@nestjs/common';
import { AuthProviders } from './providers';
import { Commands } from '../domain/usecase/commands';
import Queries from '../domain/usecase/queries';
import { HttpAuthEntryPoint } from '../infrastructure/entry-points/http/http-auth.entry-point';

@Module({
    controllers: [],
    providers: [HttpAuthEntryPoint, ...AuthProviders, ...Commands, ...Queries],
})
export class AuthModule {}
