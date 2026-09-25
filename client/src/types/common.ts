export interface PagedResult<T> {
    items: T[];
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}


export interface BaseFilter {
    Page: number,
    PageSize: number,
    Id: number,
    Name: string,
    Code: string,
    Description: string,
    CreatedBy: string,
    UpdatedBy: string,
    CreatedDate: string,
    UpdatedDate: string,
    IsActive: boolean,
    Keyword: string,
    FromDate: string,
    ToDate: string,
}