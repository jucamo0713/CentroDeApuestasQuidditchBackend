import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { NestCqrsCaller } from '../infrastructure/driven-adapters/nestjs/cqrs/nest-cqrs-caller.service';
import { AppLogger } from '../infrastructure/driven-adapters/nestjs/logger/app.logger';

/**
 * Nestjs core library module.
 */
@Global()
@Module({
    exports: [NestCqrsCaller, AppLogger],
    imports: [CqrsModule],
    providers: [NestCqrsCaller, AppLogger],
})
export class NestLibCoreModule {}
