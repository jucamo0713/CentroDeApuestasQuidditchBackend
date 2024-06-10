import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config.module';
import { NestLibCoreModule } from '../contexts/core/applications/nest-lib-core.module';

@Module({
    controllers: [],
    imports: [AppConfigModule, NestLibCoreModule],
    providers: [],
})
export class AppModule {}
