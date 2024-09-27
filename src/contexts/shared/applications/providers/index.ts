import { Provider } from '@nestjs/common';
import { NestSchedulerRepository } from '../../infrastructure/driven-adapters/schedule/nest-scheduler.repository';
import { JwtTokenRepositoryProvider } from './jwt/jwt-token.repository.provider';
import { JwtAuthGuard } from '../../infrastructure/driven-adapters/jwt/jwt-auth.guard';

export const SharedProviders: Provider[] = [NestSchedulerRepository, JwtTokenRepositoryProvider, JwtAuthGuard];
