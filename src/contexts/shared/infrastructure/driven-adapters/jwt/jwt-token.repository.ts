import { TokenRepository } from '../../../domain/model/gateways/token.repository';
import { JwtService } from '@nestjs/jwt';

export class JwtTokenRepository implements TokenRepository {
    constructor(private readonly jwt: JwtService) {}

    sign<T extends Record<string, unknown>>(payload: T, secret: string, expiresIn: number): string {
        return this.jwt.sign(payload, {
            expiresIn,
            secret,
        });
    }

    async verify<T extends Record<string, unknown>>(token: string, secret: string): Promise<T | undefined> {
        try {
            return this.jwt.verify<T>(token, { secret });
        } catch {
            return undefined;
        }
    }
}
