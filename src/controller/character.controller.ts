import { Request, Response } from "express";
import { CharacterService } from "../service/character.service";
import { sendCreated, sendConflict, sendInternalError, sendOk, sendNotFound } from "../util/response.http";

const characterService = new CharacterService();

export async function createCharacter(req: Request, res: Response) {
    try {
        const characterData = req.body;
        
        const newCharacter = await characterService.createCharacter(characterData);
        
        return sendCreated(res, newCharacter, "Character created successfully");
        
    } catch (error: any) {
        // Manejar errores específicos
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

export async function getCharacterById(req: Request, res: Response) {
    try {
        const characterId = req.params.id;
        const character = await characterService.getCharacterById(Number(characterId));
        return sendOk(res, character, "Character retrieved successfully");
        
    } catch (error: any) {
            console.error("Error retrieving character:", error);
            return sendInternalError(res, "Failed to retrieve character", error.message);
        }
}

export async function updateCharacter(req: Request, res: Response) {
    try {
        const characterId = Number(req.params.id);
        const updateData = req.body;
        
        const updatedCharacter = await characterService.updateCharacter(characterId, updateData);
        
        return sendOk(res, updatedCharacter, "Character updated successfully");
        
    } catch (error: any) {
        // Manejar errores específicos
        if (error.message && error.message.includes("not found")) {
            return sendNotFound(res, error.message);
        }
        
        if (error.message && error.message.includes("already exists")) {
            return sendConflict(res, error.message);
        }
        
        console.error("Error updating character:", error);
        return sendInternalError(res, "Failed to update character", error.message);
    }
}

export async function deleteCharacter(req: Request, res: Response) {
    try {
        const characterId = Number(req.params.id);
        
        await characterService.deleteCharacter(characterId);
        
        return sendOk(res, null, "Character deleted successfully");
        
    } catch (error: any) {
        // Manejar error de personaje no encontrado
        if (error.message && error.message.includes("not found")) {
            return sendNotFound(res, error.message);
        }
        
        console.error("Error deleting character:", error);
        return sendInternalError(res, "Failed to delete character", error.message);
    }
}