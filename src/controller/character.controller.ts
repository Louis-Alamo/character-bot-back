import { Request, Response } from "express";
import { CharacterService } from "../service/character.service";
import { sendCreated, sendConflict, sendInternalError, sendOk } from "../util/response.http";

const characterService = new CharacterService();

export async function createCharacter(req: Request, res: Response) {
    try {
        const characterData = req.body;
        
        const newCharacter = await characterService.createCharacter(characterData);
        
        return sendCreated(res, newCharacter, "Character created successfully");
        
    } catch (error: any) {
        if (error.message && error.message.includes("already exists")) {
            return sendConflict(res, error.message);
        }
        
        console.error("Error creating character:", error);
        return sendInternalError(res, "Failed to create character", error.message);
    }
}

export async function getAllCharacters(req: Request, res: Response) {
    try {
        const characters = await characterService.getAllCharacters();
        return sendOk(res, characters, "Characters retrieved successfully");
    } catch (error: any) {
        console.error("Error retrieving characters:", error);
        return sendInternalError(res, "Failed to retrieve characters", error.message);
    }
}