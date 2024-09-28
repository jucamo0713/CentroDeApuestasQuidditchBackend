import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiAcceptedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LoggerDecorator } from '../../../../core/infrastructure/driven-adapters/nestjs/interceptors/logger.interceptor';
import { NestCqrsCaller } from '../../../../core/infrastructure/driven-adapters/nestjs/cqrs/nest-cqrs-caller.service';
import { CqrsCaller } from '../../../../core/domain/model/gateways/cqrs-caller';
import { UserSignupRequest } from './requests/user-signup.request';
import { RegisterUserCommand } from '../../../domain/usecase/commands/register/register-user.command';
import { Email } from '../../../domain/model/email';
import { Password } from '../../../domain/model/password';
import { SignupResponse } from './responses/signup.response';
import { AuthTokens } from '../../../../auth/domain/model/auth-tokens';
import { JwtAuthGuard } from '../../../../shared/infrastructure/driven-adapters/jwt/jwt-auth.guard';
import { GetAuthData } from '../../../../auth/infrastructure/driven-adapters/nestjs/guards/get-auth-data.decorator';
import { AccessTokenData } from '../../../../auth/domain/model/access-token-data';
import { MeResponse } from './responses/me.response';
import { GetUserByIdQuery } from '../../../domain/usecase/queries/get/by-id/get-user-by-id.query';
import { User } from '../../../domain/model/user';
import { UserId } from '../../../domain/model/user.id';
import { BalanceResponse } from './responses/balance.response';

@Controller('/users')
@ApiTags('Users')
export class HttpUserEntryPoint {
    constructor(@Inject(NestCqrsCaller) private readonly cqrsCaller: CqrsCaller) {}

    @Post('signup')
    @LoggerDecorator({ printRequest: false, printResponse: false })
    @ApiAcceptedResponse({ type: SignupResponse })
    async signup(@Body() body: UserSignupRequest): Promise<SignupResponse> {
        const response = new SignupResponse();
        const tokens = await this.cqrsCaller.dispatch<RegisterUserCommand, AuthTokens>(
            new RegisterUserCommand(new Email(body.email), body.username, body.fullName, new Password(body.password)),
            false,
        );
        response.accessToken = tokens.token;
        response.refreshToken = tokens.refreshToken;
        return response;
    }

    @Get('me')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiAcceptedResponse({ type: MeResponse })
    async me(@GetAuthData() authData: AccessTokenData): Promise<MeResponse> {
        const data = new MeResponse();
        const user = await this.cqrsCaller.query<GetUserByIdQuery, User>(
            new GetUserByIdQuery(new UserId(authData.user)),
        );
        data.fullName = user.fullName;
        data.username = user.username;
        data.email = user.email.toString();
        return data;
    }

    @Get('balance')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiAcceptedResponse({ type: BalanceResponse })
    async balance(@GetAuthData() authData: AccessTokenData): Promise<BalanceResponse> {
        const data = new BalanceResponse();
        const user = await this.cqrsCaller.query<GetUserByIdQuery, User>(
            new GetUserByIdQuery(new UserId(authData.user)),
        );
        data.galleons = user.balance.galleons;
        data.sickles = user.balance.sickles;
        data.knuts = user.balance.knuts;
        return data;
    }
}
