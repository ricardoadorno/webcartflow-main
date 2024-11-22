import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

type Pagination<T> = {
    page: number;
    page_size: number;
    total_page: number;
    result: T[];
}


export const paginated = async <T extends ObjectLiteral>(
    query: SelectQueryBuilder<T>,
    page: number,
    page_size: number,
    ): Promise<Pagination<T>> => {

    page = page || 1;
    page_size = page_size || 9;

    const total = await query.getCount();
    const total_page = Math.ceil(total / page_size);

    const result = await query.skip((page - 1) * page_size).take(page_size).getMany();

    return {
        page,
        page_size,
        total_page,
        result,
    };
}
