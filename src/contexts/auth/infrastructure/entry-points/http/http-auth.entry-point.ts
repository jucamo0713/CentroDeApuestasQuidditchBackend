import { ApiTags } from '@nestjs/swagger';
import { CqrsCaller } from '../../../../core/domain/model/gateways/cqrs-caller';
import { Controller, Inject, Post } from '@nestjs/common';
import { NestCqrsCaller } from '../../../../core/infrastructure/driven-adapters/nestjs/cqrs/nest-cqrs-caller.service';
import { HttpContextsTagsAndPrefixConstants } from '../../../../shared/infrastructure/entry-points/http-contexts-tags-and-prefix.constants';
import { HttpAuthUriConstants } from './http-auth-uri.constants';

@ApiTags(HttpContextsTagsAndPrefixConstants.AUTH_API_TAG)
@Controller(HttpContextsTagsAndPrefixConstants.AUTH_API_PREFIX)
export class HttpAuthEntryPoint {
    constructor(@Inject(NestCqrsCaller) public readonly nestCqrsCaller: CqrsCaller) {}

    @Post(HttpAuthUriConstants.LOGIN)
    async login() {
        return;
    }

    @Post(HttpAuthUriConstants.REFRESH_TOKEN)
    async refreshToken() {
        return;
    }
}
