import { PaginationPage } from '../../../domain/model/value-objects/pagination-page';
import { PaginationLimit } from '../../../domain/model/value-objects/pagination-limit';
import { PipelineStage } from 'mongoose';
import { SearchFilterType } from '../../../domain/model/filters/search-filter.type';
import { InFilterElement } from '../../../domain/model/filters/in-filter.type';
import { StringValueObject } from '../../../../core/domain/model/value-objects/string.value-object';
import { NumberValueObject } from '../../../../core/domain/model/value-objects/number.value-object';

/**
 * Class with a set of useful methods for mongodb database repositories.
 */
export abstract class MongodbUtils {
    /**
     * Method that builds an aggregation to search for elements with pagination.
     * @template T
     * @param page - The page to be consulted.
     * @param limit - The limit of elements that the page must have.
     * @param filters - The filters to be applied in the pagination.
     * @returns The aggregation that allows to obtain paged elements in the mongo database.
     */
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

    /**
     * Method that builds an aggregation with steps to add metadata to a paged search.
     * @param page - The page to be consulted.
     * @param limit - The limit of elements that the page must have.
     * @returns Aggregation that aggregates metadata from a paged search.
     */
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

    /**
     * Method that builds an aggregation with paging steps.
     * @param page - The page to be consulted.
     * @param limit - The limit of elements that the page must have.
     * @returns Constructed aggregation.
     */
    private static resolvePagination(
        page: PaginationPage,
        limit: PaginationLimit,
    ): Array<PipelineStage.FacetPipelineStage> {
        const pagination: Array<PipelineStage.FacetPipelineStage> = [];
        const skip: number = Math.round((page.toNumber() - 1) * limit.toNumber());
        pagination.push({ $skip: skip }, { $limit: limit.toNumber() });
        return pagination;
    }

    /**
     * Resolves filters for MongoDB aggregation pipeline.
     * @template T - The type of the data for which filters are applied.
     * @param [filters] - The search filters.
     * @returns The MongoDB aggregation pipeline stage for matching filters.
     */
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

    /**
     * Allows to convert valuables to their raw values.
     * @param filter The filter param.
     * @returns The mapped value objects.
     */
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
