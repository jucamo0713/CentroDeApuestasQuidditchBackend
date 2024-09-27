export interface TokenRepository {
    sign<T extends Record<string, unknown>>(payload: T, secret: string, expiresIn: number): string;

    verify<T extends Record<string, unknown>>(token: string, secret: string): Promise<T | undefined>;
}
