import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';
import { ValidateTokenQuery } from '../../../../auth/domain/usecase/queries/validate/validate-token.query';
import { NestCqrsCaller } from '../../../../core/infrastructure/driven-adapters/nestjs/cqrs/nest-cqrs-caller.service';
import { AccessTokenData } from '../../../../auth/domain/model/access-token-data';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly cqrsCaller: NestCqrsCaller) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        switch (context.getType()) {
            case 'http': {
                const request: Request = context.switchToHttp().getRequest<Request>();
                const token: string | null = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
                if (token) {
                    request.user = await this.cqrsCaller.query<ValidateTokenQuery, AccessTokenData | undefined>(
                        new ValidateTokenQuery(token),
                        false,
                        false,
                    );
                    if (!request.user) {
                        return false;
                    }
                } else {
                    return false;
                }
                return true;
            }
            default:
                throw new Error(`Context ${context.getType()} not supported`);
        }
    }
}
