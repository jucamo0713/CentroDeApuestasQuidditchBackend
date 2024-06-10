/**
 * Interface representing a scheduler repository.
 *
 * Provides methods for scheduling tasks to be executed.
 */
export interface SchedulerRepository {
    /**
     * Schedules a task to be executed at a specified date.
     * @param {string} PID - The process identifier.
     * @param {string} name - The name of the task.
     * @param {Date} date - The date and time when the task should be executed.
     * @param {(...params: unknown[]) => unknown} cb - The callback function to be executed.
     * @param {...unknown[]} params - The parameters to be passed to the callback function.
     * @returns {Promise<void>} - A promise that resolves when the task is successfully scheduled.
     */
    createTaskToExecInDate(
        PID: string,
        name: string,
        date: Date,
        cb: (...params: unknown[]) => unknown,
        ...params: unknown[]
    ): Promise<void>;
}
