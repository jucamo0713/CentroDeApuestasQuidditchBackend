import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import process from 'node:process';
import { LoggerInterceptor } from '../contexts/core/infrastructure/driven-adapters/nestjs/interceptors/logger.interceptor';
import { AppExceptionFilter } from '../contexts/core/infrastructure/driven-adapters/nestjs/filters/app.exception-filter';
import { AppLogger } from '../contexts/core/infrastructure/driven-adapters/nestjs/logger/app.logger';
import { TimeoutInterceptor } from '../contexts/core/infrastructure/driven-adapters/nestjs/interceptors/timeout.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new LoggerInterceptor(app.get(Reflector)), new TimeoutInterceptor(app.get(Reflector)));
    app.useGlobalFilters(new AppExceptionFilter(process.env.APP_NAME));
    app.useLogger(app.get(AppLogger));
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.listen(Number(process.env.APP_PORT));
}

bootstrap().then(() => {
    const logger: Logger = new Logger('APP');
    logger.log(`Server listening on port ${process.env.APP_PORT}`);
});
