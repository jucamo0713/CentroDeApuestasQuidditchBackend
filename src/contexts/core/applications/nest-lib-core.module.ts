import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { NestCqrsCaller } from '../infrastructure/driven-adapters/nestjs/cqrs/nest-cqrs-caller.service';
import { AppExceptionFilter } from '../infrastructure/driven-adapters/nestjs/filters/app.exception-filter';

@Global()
@Module({
    exports: [NestCqrsCaller],
    imports: [CqrsModule],
    providers: [NestCqrsCaller, AppExceptionFilter],
})
export class NestLibCoreModule {}
