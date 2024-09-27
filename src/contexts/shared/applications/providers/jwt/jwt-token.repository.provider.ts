import { FactoryProvider } from '@nestjs/common';
import { JwtTokenRepository } from '../../../infrastructure/driven-adapters/jwt/jwt-token.repository';
import { JwtService } from '@nestjs/jwt';

export const JwtTokenRepositoryProvider: FactoryProvider<JwtTokenRepository> = {
    inject: [JwtService],
    provide: JwtTokenRepository,
    useFactory: (service: JwtService) => {
        return new JwtTokenRepository(service);
    },
};
