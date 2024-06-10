/**
 * Represents the structure of an error response.
 */
export class ExceptionDto {
    /**
     * Indicates whether the response is successful (always false for error responses).
     */
    public readonly success: false = false as const;

    /**
     * The timestamp when the error response occurred.
     */
    timestamp: string;

    /**
     * The custom status code associated with the error.
     */
    statusCode: number;

    /**
     * The HTTP status code of the error response.
     */
    httpStatusCode: number;

    /**
     * The message describing the error.
     */
    message: string;

    /**
     * The process identifier (PID) associated with the error response.
     */
    pid: string;
    /**
     * Determines the application that is executing the process.
     */
    appName: string;
    /**
     * retry Flag determining whether to retry an exception.
     */
    retry: boolean;
}
