import { Provider } from '@nestjs/common';
import { NestSchedulerRepository } from '../../infrastructure/driven-adapters/schedule/nest-scheduler.repository';

/**
 * Array of providers for the shared module.
 */
export const SharedProviders: Provider[] = [NestSchedulerRepository];
