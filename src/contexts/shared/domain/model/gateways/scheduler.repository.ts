export interface SchedulerRepository {
    createTaskToExecInDate(
        name: string,
        date: Date,
        cb: (...params: unknown[]) => unknown,
        ...params: unknown[]
    ): Promise<void>;
}
