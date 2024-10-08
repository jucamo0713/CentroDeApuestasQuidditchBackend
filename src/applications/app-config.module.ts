import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvSchema } from './env.schema';

@Global()
@Module({
    exports: [ConfigModule],
    imports: [
        ConfigModule.forRoot({
            expandVariables: true,
            isGlobal: true,
            validationSchema: EnvSchema,
        }),
    ],
})
export class AppConfigModule {}
