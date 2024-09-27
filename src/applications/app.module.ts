import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config.module';
import { NestLibCoreModule } from '../contexts/core/applications/nest-lib-core.module';
import { AuthModule } from '../contexts/auth/applications/auth.module';

@Module({
    controllers: [],
    imports: [AppConfigModule, NestLibCoreModule, AuthModule],
    providers: [],
})
export class AppModule {}
