import { SchedulerRepository } from '../../../domain/model/gateways/scheduler.repository';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { Injectable } from '@nestjs/common';
import { AppLogger } from '../../../../core/infrastructure/driven-adapters/nestjs/logger/app.logger';
import { NO_SCHEDULER_FOUND } from '@nestjs/schedule/dist/schedule.messages';

/**
 * Scheduler implementation with nest schedule
 */
@Injectable()
export class NestSchedulerRepository implements SchedulerRepository {
    private readonly logger: AppLogger = new AppLogger(NestSchedulerRepository.name);

    /**
     * @param schedulerRegistry Scheduler manager of node.
     */
    constructor(private schedulerRegistry: SchedulerRegistry) {}

    /**
     * Method to schedule method call in specific date.
     * @param PID The process id.
     * @param name The name to registry cron.
     * @param date The date to schedule.
     * @param cb method to be called.
     * @param params params to call cb method.
     */
    async createTaskToExecInDate(
        PID: string,
        name: string,
        date: Date,
        cb: (...params: unknown[]) => Promise<unknown>,
        ...params: unknown[]
    ): Promise<void> {
        this.logger.log(`[${this.createTaskToExecInDate.name}] - INIT`, PID);
        try {
            this.schedulerRegistry.getCronJob(name);
        } catch (e: unknown) {
            if (e instanceof Error && e.message === NO_SCHEDULER_FOUND('Cron Job', name)) {
                const job = new CronJob(date, async () => {
                    await cb(...params);
                    this.schedulerRegistry.deleteCronJob(name);
                });
                job.start();
                this.schedulerRegistry.addCronJob(name, job);
            } else {
                throw e;
            }
        }
        this.logger.log(`[${this.createTaskToExecInDate.name}] - FINISH`, PID);
    }
}
