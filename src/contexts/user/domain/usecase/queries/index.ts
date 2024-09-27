import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQueryHandler } from './get/by-id/get-user-by-id.query-handler';
import { GetUserByEmailQueryHandler } from './get/by-email/get-user-by-email.query-handler';

/**
 * Array of query handler classes.
 */
export const Queries: Type<IQueryHandler>[] = [GetUserByEmailQueryHandler, GetUserByIdQueryHandler];
