import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    getRequest(context: ExecutionContext): Request {
        return context.switchToHttp().getRequest();
    }
}
