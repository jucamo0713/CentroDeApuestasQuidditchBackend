export class ExceptionDto {
    public readonly success: false = false as const;

    timestamp: string = '';

    httpStatusCode: number = 500;

    message: string = 'INTERNAL SERVER ERROR';
}
