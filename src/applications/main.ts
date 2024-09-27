import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import process from 'node:process';
import { LoggerInterceptor } from '../contexts/core/infrastructure/driven-adapters/nestjs/interceptors/logger.interceptor';
import { TimeoutInterceptor } from '../contexts/core/infrastructure/driven-adapters/nestjs/interceptors/timeout.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppExceptionFilter } from '../contexts/core/infrastructure/driven-adapters/nestjs/filters/app.exception-filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });
    app.enableCors();
    app.flushLogs();
    app.useGlobalFilters(app.get(AppExceptionFilter));
    app.useGlobalInterceptors(app.get(TimeoutInterceptor), app.get(LoggerInterceptor));
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.setGlobalPrefix(process.env.APP_GLOBAL_PREFIX!);
    const swaggerConfig = new DocumentBuilder()
        .setTitle(process.env.SWAGGER_TITLE!)
        .setDescription(process.env.SWAGGER_DESCRIPTION!)
        .addBearerAuth()
        .build();
    SwaggerModule.setup(process.env.SWAGGER_PATH!, app, SwaggerModule.createDocument(app, swaggerConfig));
    await app.listen(Number(process.env.APP_PORT!));
}

bootstrap().then(() => {
    const logger: Logger = new Logger('APP');
    logger.log(`Server listening on port ${process.env.APP_PORT}`);
});
