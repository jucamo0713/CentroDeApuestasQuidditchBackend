import { ApiAcceptedResponse, ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { CqrsCaller } from '../../../../core/domain/model/gateways/cqrs-caller';
import { Controller, Headers, Inject, Post, UseGuards } from '@nestjs/common';
import { NestCqrsCaller } from '../../../../core/infrastructure/driven-adapters/nestjs/cqrs/nest-cqrs-caller.service';
import { GenerateAuthTokensCommand } from '../../../domain/usecase/commands/generate-auth-tokens/generate-auth-tokens.command';
import { LoggerDecorator } from '../../../../core/infrastructure/driven-adapters/nestjs/interceptors/logger.interceptor';
import { LoginResponse } from './responses/login.response';
import { LocalAuthGuard } from '../../driven-adapters/nestjs/guards/local/local-auth.guard';
import { AuthTokens } from '../../../domain/model/auth-tokens';
import { LoginRequest } from './requests/login.request';
import { GetAuthData } from '../../driven-adapters/nestjs/guards/get-auth-data.decorator';
import { UserId } from '../../../../user/domain/model/user.id';
import { RefreshAuthTokensCommand } from '../../../domain/usecase/commands/refresh-auth-tokens/refresh-auth-tokens.command';
import { AccessTokenData } from '../../../domain/model/access-token-data';

@ApiTags('Auth')
@Controller('auth')
export class HttpAuthEntryPoint {
    constructor(@Inject(NestCqrsCaller) public readonly cqrsCaller: CqrsCaller) {}

    @Post('/login')
    @LoggerDecorator({ printRequest: false, printResponse: false })
    @ApiAcceptedResponse({ type: LoginResponse })
    @ApiBody({ type: LoginRequest })
    @UseGuards(LocalAuthGuard)
    async localeLogin(@GetAuthData() authData: AccessTokenData): Promise<LoginResponse> {
        const response: LoginResponse = new LoginResponse();
        const tokens: AuthTokens = await this.cqrsCaller.dispatch<GenerateAuthTokensCommand, AuthTokens>(
            new GenerateAuthTokensCommand(new UserId(authData.user)),
            true,
            false,
        );
        response.accessToken = tokens.token;
        response.refreshToken = tokens.refreshToken;
        return response;
    }

    @Post('/refresh-session')
    @LoggerDecorator({ printRequest: false, printResponse: false })
    @ApiAcceptedResponse({ type: LoginResponse })
    @ApiHeader({
        name: 'refresh-token',
    })
    async refreshToken(@Headers('refresh-token') refreshToken: string): Promise<LoginResponse> {
        const response: LoginResponse = new LoginResponse();
        const tokens: AuthTokens = await this.cqrsCaller.dispatch<RefreshAuthTokensCommand, AuthTokens>(
            new RefreshAuthTokensCommand(refreshToken),
            false,
            false,
        );
        response.accessToken = tokens.token;
        response.refreshToken = tokens.refreshToken;
        return response;
    }
}
