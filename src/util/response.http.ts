import { Response } from "express";
import { ApiResponse } from "../interface/response";

/**
 * Mapeo de códigos HTTP a sus descripciones de estado
 */
const HTTP_STATUS_MESSAGES: Record<number, string> = {
    200: "OK",
    201: "Created",
    204: "No Content",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
    500: "Internal Server Error",
};

/**
 * Genera la marca de tiempo en formato legible
 */
function getTimestamp(): string {
    return new Date().toString();
}

/**
 * Respuesta exitosa genérica
 */
export function sendSuccessResponse<T>(
    res: Response,
    statusCode: number,
    data: T,
    message: string
): Response {
    const response: ApiResponse<T> = {
        success: true,
        statusCode,
        status: HTTP_STATUS_MESSAGES[statusCode] || "Success",
        data,
        message,
        timestamp: getTimestamp(),
    };

    return res.status(statusCode).json(response);
}

/**
 * Respuesta de error genérica
 */
export function sendErrorResponse(
    res: Response,
    statusCode: number,
    message: string,
    data?: any
): Response {
    const response: ApiResponse = {
        success: false,
        statusCode,
        status: HTTP_STATUS_MESSAGES[statusCode] || "Error",
        data,
        message,
        timestamp: getTimestamp(),
    };

    return res.status(statusCode).json(response);
}

/**
 * Respuesta 200 OK
 */
export function sendOk<T>(res: Response, data: T, message = "Request successful"): Response {
    return sendSuccessResponse(res, 200, data, message);
}

/**
 * Respuesta 201 Created
 */
export function sendCreated<T>(res: Response, data: T, message = "Resource created successfully"): Response {
    return sendSuccessResponse(res, 201, data, message);
}

/**
 * Respuesta 400 Bad Request
 */
export function sendBadRequest(res: Response, message = "Invalid request", data?: any): Response {
    return sendErrorResponse(res, 400, message, data);
}

/**
 * Respuesta 404 Not Found
 */
export function sendNotFound(res: Response, message = "Resource not found"): Response {
    return sendErrorResponse(res, 404, message);
}

/**
 * Respuesta 409 Conflict
 */
export function sendConflict(res: Response, message = "Resource already exists"): Response {
    return sendErrorResponse(res, 409, message);
}

/**
 * Respuesta 500 Internal Server Error
 */
export function sendInternalError(res: Response, message = "Internal server error", error?: any): Response {
    return sendErrorResponse(res, 500, message, process.env.NODE_ENV === "development" ? error : undefined);
}
