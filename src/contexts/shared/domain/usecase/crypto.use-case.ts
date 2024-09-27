import * as crypto from 'node:crypto';

export abstract class CryptoUseCase {
    public static hash(value: string, ...salt: string[]): string {
        return crypto
            .createHash('sha256')
            .update(value + salt.join(''))
            .digest('hex');
    }

    public static cypher(value: string, secret: string, ...salt: string[]): string {
        const hash = CryptoUseCase.hash(secret, ...salt);
        const cipher = crypto.createCipheriv(
            'aes-256-cbc',
            Buffer.from(hash, 'hex'),
            Buffer.from(hash.slice(0, Math.round(hash.length / 2)), 'hex'),
        );
        let encrypted = cipher.update(value, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
    }

    public static decipher(value: string, secret: string, ...salt: string[]): string {
        const hash = CryptoUseCase.hash(secret, ...salt);
        const decipher = crypto.createDecipheriv(
            'aes-256-cbc',
            Buffer.from(hash, 'hex'),
            Buffer.from(hash.slice(0, Math.round(hash.length / 2)), 'hex'),
        );
        let decrypted = decipher.update(value, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    public static asymmetricPublicCipher(value: string, publicKey: string): string {
        return crypto.publicEncrypt(publicKey, Buffer.from(value)).toString('base64');
    }
}
