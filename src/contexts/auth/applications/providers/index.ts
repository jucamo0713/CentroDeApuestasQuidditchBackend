import { Provider } from '@nestjs/common';
import { AuthUseCaseProvider } from './auth.use-case.provider';
import { LocalAuthStrategy } from '../../infrastructure/driven-adapters/nestjs/guards/local/local-auth.strategy';

export const AuthProviders: Array<Provider> = [AuthUseCaseProvider, LocalAuthStrategy];
