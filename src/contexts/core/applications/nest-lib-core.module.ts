import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { NestCqrsCaller } from '../infrastructure/driven-adapters/nestjs/cqrs/nest-cqrs-caller.service';
import { AppExceptionFilter } from '../infrastructure/driven-adapters/nestjs/filters/app.exception-filter';
import { TimeoutInterceptor } from '../infrastructure/driven-adapters/nestjs/interceptors/timeout.interceptor';
import { LoggerInterceptor } from '../infrastructure/driven-adapters/nestjs/interceptors/logger.interceptor';

@Global()
@Module({
    exports: [NestCqrsCaller],
    imports: [CqrsModule],
    providers: [NestCqrsCaller, AppExceptionFilter, TimeoutInterceptor, LoggerInterceptor],
})
export class NestLibCoreModule {}
