import { Request, Response, NextFunction } from "express";
import { sendBadRequest } from "../util/response.http";

/**
 * Middleware para validar la creación de un personaje
 */
export function validateCreateCharacter(req: Request, res: Response, next: NextFunction) {
    const { name, description, avatar_url, system_prompt, greeting_message, temperature } = req.body;

    // Validar campos requeridos
    if (!name || typeof name !== "string" || name.trim().length === 0) {
        return sendBadRequest(res, "Field 'name' is required and must be a non-empty string");
    }

    if (!system_prompt || typeof system_prompt !== "string" || system_prompt.trim().length === 0) {
        return sendBadRequest(res, "Field 'system_prompt' is required and must be a non-empty string");
    }

    // Validar campos opcionales (si están presentes)
    if (description !== undefined && typeof description !== "string") {
        return sendBadRequest(res, "Field 'description' must be a string");
    }

    if (avatar_url !== undefined && typeof avatar_url !== "string") {
        return sendBadRequest(res, "Field 'avatar_url' must be a string");
    }

    if (greeting_message !== undefined && typeof greeting_message !== "string") {
        return sendBadRequest(res, "Field 'greeting_message' must be a string");
    }

    // Validar temperature (debe estar entre 0.1 y 1.0)
    if (temperature !== undefined) {
        const temp = Number(temperature);
        
        if (isNaN(temp)) {
            return sendBadRequest(res, "Field 'temperature' must be a valid number");
        }
        
        if (temp < 0.1 || temp > 1.0) {
            return sendBadRequest(res, "Field 'temperature' must be between 0.1 and 1.0");
        }
    }

    // Sanitizar campos de texto (eliminar espacios extra)
    req.body.name = name.trim();
    req.body.system_prompt = system_prompt.trim();
    
    if (description) {
        req.body.description = description.trim();
    }
    
    if (greeting_message) {
        req.body.greeting_message = greeting_message.trim();
    }

    // Si todas las validaciones pasan, continuar al siguiente middleware/controlador
    next();
}