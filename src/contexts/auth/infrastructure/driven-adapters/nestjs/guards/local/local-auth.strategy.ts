import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Request } from 'express';
import { AccessTokenData } from '../../../../../domain/model/access-token-data';
import { NestCqrsCaller } from '../../../../../../core/infrastructure/driven-adapters/nestjs/cqrs/nest-cqrs-caller.service';
import { CqrsCaller } from '../../../../../../core/domain/model/gateways/cqrs-caller';
import { Inject, Injectable } from '@nestjs/common';
import { LoginCommand } from '../../../../../domain/usecase/commands/login/login.command';
import { Email } from '../../../../../../user/domain/model/email';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(NestCqrsCaller) private readonly cqrsCaller: CqrsCaller) {
        super({ passReqToCallback: true, usernameField: 'email' });
    }

    async validate(req: Request, email: string, password: string): Promise<AccessTokenData> {
        return await this.cqrsCaller.dispatch<LoginCommand, AccessTokenData>(
            new LoginCommand(new Email(email), password),
            false,
        );
    }
}
