import { FactoryProvider } from '@nestjs/common';
import { AuthUseCase } from '../../domain/usecase/auth.use-case';
import { JwtTokenRepository } from '../../../shared/infrastructure/driven-adapters/jwt/jwt-token.repository';
import { NestCqrsCaller } from '../../../core/infrastructure/driven-adapters/nestjs/cqrs/nest-cqrs-caller.service';

export const AuthUseCaseProvider: FactoryProvider<AuthUseCase> = {
    inject: [NestCqrsCaller, JwtTokenRepository],
    provide: AuthUseCase,
    useFactory: (cqrsCaller: NestCqrsCaller, tokenRepository: JwtTokenRepository): AuthUseCase => {
        return new AuthUseCase(cqrsCaller, tokenRepository);
    },
};
