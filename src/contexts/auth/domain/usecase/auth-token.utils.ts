export abstract class AuthTokenUtils {
    static extractBearerToken(raw: string): string {
        if (raw?.startsWith('Bearer ')) {
            const split = raw.split(' ');
            return split.length == 2 ? split[1] : '';
        }
        return '';
    }
}
