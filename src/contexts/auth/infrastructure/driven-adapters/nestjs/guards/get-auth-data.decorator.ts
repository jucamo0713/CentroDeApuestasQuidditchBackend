import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenData } from '../../../../domain/model/access-token-data';

export const GetAuthData = createParamDecorator((data: unknown, context: ExecutionContext): AccessTokenData => {
    switch (context.getType()) {
        case 'http': {
            const request: Request = context.switchToHttp().getRequest<Request>();
            return request.user as AccessTokenData;
        }
        default:
            throw new Error('Context not supported');
    }
});
