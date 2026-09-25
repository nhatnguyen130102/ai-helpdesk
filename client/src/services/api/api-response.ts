export interface BaseResponse<T> {
    data: T;
    message: string;
    success: boolean;
    statusCode: number;
}