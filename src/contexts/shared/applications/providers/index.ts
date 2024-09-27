import { Provider } from '@nestjs/common';
import { NestSchedulerRepository } from '../../infrastructure/driven-adapters/schedule/nest-scheduler.repository';
import { JwtTokenRepositoryProvider } from './jwt/jwt-token.repository.provider';

export const SharedProviders: Provider[] = [NestSchedulerRepository, JwtTokenRepositoryProvider];
