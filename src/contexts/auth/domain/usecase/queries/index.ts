import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { ValidateTokenQueryHandler } from './validate/validate-token.query-handler';
const Queries: Type<IQueryHandler>[] = [ValidateTokenQueryHandler];
export default Queries;
