import { Global, Module } from '@nestjs/common';
import * as process from 'node:process';
import { SharedProviders } from './providers';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDatabaseConstants } from './providers/mongodb/mongo-database.constants';
import { AppConfigModule } from '../../../applications/app-config.module';
import { ScheduleModule } from '@nestjs/schedule';

/**
 * Module for shared functionalities.
 */
@Global()
@Module({
    exports: [AppConfigModule, MongooseModule, ...SharedProviders],
    imports: [
        AppConfigModule,
        MongooseModule.forRoot(process.env.MONGODB_URL, {
            connectionName: MongoDatabaseConstants.DATABASE_CONNECTION_NAME,
        }),
        ScheduleModule.forRoot(),
    ],
    providers: [...SharedProviders],
})
export class SharedModule {}
