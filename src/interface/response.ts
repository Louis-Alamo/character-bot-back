export interface ApiResponse<T = any> {
    success: boolean;
    statusCode: number;
    status: string;
    data?: T;
    message: string;
    timestamp: string;
}
