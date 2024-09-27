import { AuthTokens } from '../model/auth-tokens';
import { UserId } from '../../../user/domain/model/user.id';
import { TokenRepository } from '../../../shared/domain/model/gateways/token.repository';
import { AccessTokenData } from '../model/access-token-data';
import { RefreshTokenData } from '../model/refresh-token-data';
import { User } from '../../../user/domain/model/user';
import { CqrsCaller } from '../../../core/domain/model/gateways/cqrs-caller';
import { Password } from '../../../user/domain/model/password';
import { GetUserByIdQuery } from '../../../user/domain/usecase/queries/get/by-id/get-user-by-id.query';
import { Email } from '../../../user/domain/model/email';
import { GetUserByEmailQuery } from '../../../user/domain/usecase/queries/get/by-email/get-user-by-email.query';
import * as process from 'node:process';
import { RefreshTokenNotValidException } from '../model/exceptions/refresh-token-not-valid.exception';
import { Logger } from '@nestjs/common';

export class AuthUseCase {
    private readonly logger = new Logger(AuthUseCase.name);

    constructor(
        private readonly cqrsCaller: CqrsCaller,
        private readonly tokenRepository: TokenRepository,
    ) {}

    async generateAuthTokens(userId: UserId): Promise<AuthTokens> {
        this.logger.log(`[${this.generateAuthTokens.name}] INIT`);
        const token = this.tokenRepository.sign<AccessTokenData>(
            {
                user: userId.toString(),
            },
            process.env.AUTH_TOKEN_SECRET!,
            Number(process.env.AUTH_TOKEN_EXPIRATION!),
        );
        const refreshToken = this.tokenRepository.sign<RefreshTokenData>(
            {
                user: userId.toString(),
            },
            process.env.AUTH_REFRESH_TOKEN_SECRET!,
            Number(process.env.AUTH_REFRESH_TOKEN_EXPIRATION!),
        );

        const response: AuthTokens = {
            refreshToken,
            token,
        };
        this.logger.log(`[${this.generateAuthTokens.name}] FINISH`);
        return response;
    }

    async login(email: Email, password: string): Promise<AccessTokenData | null> {
        this.logger.log(`[${this.login.name}] INIT ::`);
        /* Login Validations */
        const user: User = await this.cqrsCaller.query<GetUserByEmailQuery, User>(
            new GetUserByEmailQuery(email, false),
        );
        if (!user) return null;
        const passwordToValidate: Password = Password.generate(password, user.userId, false);
        if (!passwordToValidate.compare(user.password)) return null;
        const accessTokenData: AccessTokenData = {
            user: user.userId.toString(),
        };
        this.logger.log(`[${this.login.name}] FINISH ::`);
        return accessTokenData;
    }

    async refreshAuthTokens(refreshToken: string): Promise<AuthTokens> {
        this.logger.log(`[${this.refreshAuthTokens.name}] INIT ::`);
        const refreshTokenData: RefreshTokenData | undefined = await this.tokenRepository.verify<RefreshTokenData>(
            refreshToken,
            process.env.AUTH_REFRESH_TOKEN_SECRET!,
        );
        if (!refreshTokenData) throw new RefreshTokenNotValidException(AuthUseCase.name);
        const user: User = await this.cqrsCaller.query<GetUserByIdQuery, User>(
            new GetUserByIdQuery(new UserId(refreshTokenData.user)),
        );
        const tokens: Promise<AuthTokens> = this.generateAuthTokens(user.userId);
        this.logger.log(`[${this.refreshAuthTokens.name}] FINISH ::`);
        return tokens;
    }

    async validateToken(token: string): Promise<AccessTokenData | undefined> {
        this.logger.log(`[${this.refreshAuthTokens.name}] INIT ::`);
        const data = this.tokenRepository.verify<AccessTokenData>(token, process.env.AUTH_TOKEN_SECRET!);
        this.logger.log(`[${this.refreshAuthTokens.name}] FINISH ::`);
        return data;
    }
}
