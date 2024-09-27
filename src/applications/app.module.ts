import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config.module';
import { NestLibCoreModule } from '../contexts/core/applications/nest-lib-core.module';
import { AuthModule } from '../contexts/auth/applications/auth.module';
import { UserModule } from '../contexts/user/applications/user.module';
import { SharedModule } from '../contexts/shared/applications/shared.module';

@Module({
    controllers: [],
    imports: [AppConfigModule, NestLibCoreModule, SharedModule, AuthModule, UserModule],
    providers: [],
})
export class AppModule {}
