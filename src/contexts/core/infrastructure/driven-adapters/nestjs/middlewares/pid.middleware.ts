import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

/**
 * PID middleware for set PID in http requests.
 */
export class PidMiddleware implements NestMiddleware {
    /**
     * Intercepts the execution context and handles request and response logging.
     * @param req - The http request.
     * @param res - The http response.
     * @param next - The next function.
     */
    use(req: Request, res: Response, next: NextFunction): void {
        const pid: string = (req.headers.pid as string) ?? uuid();
        req.headers.pid = pid;
        res.setHeader('pid', pid);
        next();
    }
}
