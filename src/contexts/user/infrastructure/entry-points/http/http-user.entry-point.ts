import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('/users')
@ApiTags('Users')
export class HttpUserEntryPoint {}
