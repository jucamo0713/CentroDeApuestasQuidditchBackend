import { PaginationPage } from '../../../domain/model/value-objects/pagination-page';
import { PaginationLimit } from '../../../domain/model/value-objects/pagination-limit';
import { PipelineStage } from 'mongoose';
import { SearchFilterType } from '../../../domain/model/filters/search-filter.type';
import { InFilterElement } from '../../../domain/model/filters/in-filter.type';
import { StringValueObject } from '../../../../core/domain/model/value-objects/string.value-object';
import { NumberValueObject } from '../../../../core/domain/model/value-objects/number.value-object';

export abstract class MongodbUtils {
    public static buildPaginationQuery<T = unknown>(
        page: PaginationPage,
        limit: PaginationLimit,
        filters?: SearchFilterType<T>,
    ): Array<PipelineStage> {
        const aggregateOptions: Array<PipelineStage> = [];
        const metadata: Array<PipelineStage.FacetPipelineStage> = this.resolveMetadata(page, limit);
        const data: Array<PipelineStage.FacetPipelineStage> = [];
        data.push(...this.resolvePagination(page, limit));
        if (filters) aggregateOptions.push(this.resolveFilters<T>(filters));
        aggregateOptions.push({ $sort: { createdAt: -1 } });
        aggregateOptions.push({ $facet: { data, metadata } });
        aggregateOptions.push({ $unwind: { path: '$metadata' } });
        return aggregateOptions;
    }

    private static resolveMetadata(
        page: PaginationPage,
        limit: PaginationLimit,
    ): Array<PipelineStage.FacetPipelineStage> {
        const metadata: Array<PipelineStage.FacetPipelineStage> = [];
        metadata.push({ $count: 'total' });
        metadata.push({ $addFields: { page: page.toNumber() } });
        metadata.push({ $addFields: { totalPages: { $ceil: { $divide: ['$total', limit.toNumber()] } } } });
        return metadata;
    }

    private static resolvePagination(
        page: PaginationPage,
        limit: PaginationLimit,
    ): Array<PipelineStage.FacetPipelineStage> {
        const pagination: Array<PipelineStage.FacetPipelineStage> = [];
        const skip: number = Math.round((page.toNumber() - 1) * limit.toNumber());
        pagination.push({ $skip: skip }, { $limit: limit.toNumber() });
        return pagination;
    }

    private static resolveFilters<T>(filters?: SearchFilterType<T>): PipelineStage.Match {
        const query: PipelineStage.Match = { $match: {} };
        if (filters) {
            Object.keys(filters).forEach((k) => {
                if (filters[k] instanceof InFilterElement) {
                    query.$match[k] = {
                        $in: [filters[k].data.map(MongodbUtils.mapValueObjects)],
                    };
                } else if (Array.isArray(filters[k])) {
                    query.$match[k] = filters[k].map(MongodbUtils.mapValueObjects);
                } else {
                    query.$match[k] = MongodbUtils.mapValueObjects(filters[k]);
                }
            });
        }
        return query;
    }

    private static mapValueObjects(filter: unknown): unknown {
        if (filter instanceof StringValueObject) {
            return filter.toString();
        } else if (filter instanceof NumberValueObject) {
            return filter.toNumber();
        } else {
            return filter;
        }
    }
}
