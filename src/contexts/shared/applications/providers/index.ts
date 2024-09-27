import { Provider } from '@nestjs/common';
import { NestSchedulerRepository } from '../../infrastructure/driven-adapters/schedule/nest-scheduler.repository';

export const SharedProviders: Provider[] = [NestSchedulerRepository];
