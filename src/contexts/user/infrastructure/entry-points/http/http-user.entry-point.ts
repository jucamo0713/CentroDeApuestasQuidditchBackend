import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags, ApiAcceptedResponse } from '@nestjs/swagger';
import { LoggerDecorator } from '../../../../core/infrastructure/driven-adapters/nestjs/interceptors/logger.interceptor';
import { NestCqrsCaller } from '../../../../core/infrastructure/driven-adapters/nestjs/cqrs/nest-cqrs-caller.service';
import { CqrsCaller } from '../../../../core/domain/model/gateways/cqrs-caller';
import { UserSignupRequest } from './requests/user-signup.request';
import { RegisterUserCommand } from '../../../domain/usecase/commands/register/register-user.command';
import { Email } from '../../../domain/model/email';
import { Password } from '../../../domain/model/password';
import { SignupResponse } from './responses/signup.response';
import { AuthTokens } from '../../../../auth/domain/model/auth-tokens';

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
}
