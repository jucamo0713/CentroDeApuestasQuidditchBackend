import { Global, Module } from '@nestjs/common';
import * as process from 'node:process';
import { SharedProviders } from './providers';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDatabaseConstants } from './providers/mongodb/mongo-database.constants';
import { AppConfigModule } from '../../../applications/app-config.module';
import { ScheduleModule } from '@nestjs/schedule';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
    exports: [AppConfigModule, MongooseModule, ...SharedProviders],
    imports: [
        AppConfigModule,
        MongooseModule.forRoot(process.env.MONGODB_URL!, {
            connectionName: MongoDatabaseConstants.DATABASE_CONNECTION_NAME,
        }),
        ScheduleModule.forRoot(),
        JwtModule.register({}),
    ],
    providers: [...SharedProviders],
})
export class SharedModule {}
