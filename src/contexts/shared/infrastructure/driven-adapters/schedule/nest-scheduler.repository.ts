import { SchedulerRepository } from '../../../domain/model/gateways/scheduler.repository';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { Injectable, Logger } from '@nestjs/common';
import { NO_SCHEDULER_FOUND } from '@nestjs/schedule/dist/schedule.messages';

@Injectable()
export class NestSchedulerRepository implements SchedulerRepository {
    private readonly logger: Logger = new Logger(NestSchedulerRepository.name);

    constructor(private schedulerRegistry: SchedulerRegistry) {}

    async createTaskToExecInDate(
        name: string,
        date: Date,
        cb: (...params: unknown[]) => Promise<unknown>,
        ...params: unknown[]
    ): Promise<void> {
        this.logger.log(`[${this.createTaskToExecInDate.name}] - INIT`);
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
        this.logger.log(`[${this.createTaskToExecInDate.name}] - FINISH`);
    }
}
