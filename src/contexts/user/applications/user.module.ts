import { Module } from '@nestjs/common';
import { HttpUserEntryPoint } from '../infrastructure/entry-points/http/http-user.entry-point';
import { UserProviders } from './providers';
import { Queries } from '../domain/usecase/queries';
import { Commands } from '../domain/usecase/commands';

/**
 * Module to configure processes related to users.
 */
@Module({
    controllers: [HttpUserEntryPoint],
    imports: [],
    providers: [...UserProviders, ...Queries, ...Commands],
})
export class UserModule {}
