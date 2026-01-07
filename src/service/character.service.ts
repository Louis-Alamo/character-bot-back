import { Character, CreateCharacterDTO, UpdateCharacterDTO } from "../interface/character";
import { CharacterRepository } from "../repository/character.repository";

/**
 * Service para la lógica de negocio de personajes
 */
export class CharacterService {
    private repository: CharacterRepository;

    constructor() {
        this.repository = new CharacterRepository();
    }

    /**
     * Crea un nuevo personaje
     */
    async createCharacter(data: CreateCharacterDTO): Promise<Character> {
        // Verificar si ya existe un personaje con el mismo nombre
        const existing = await this.repository.findByName(data.name);
        
        if (existing) {
            throw new Error(`A character with the name '${data.name}' already exists`);
        }

        // Crear el personaje
        const character = await this.repository.create(data);
        
        return character;
    }

    /**
     * Obtiene un personaje por ID
     */
    async getCharacterById(id: number): Promise<Character> {
        const character = await this.repository.findById(id);
        
        if (!character) {
            throw new Error(`Character with ID ${id} not found`);
        }
        
        return character;
    }

    /**
     * Obtiene todos los personajes
     */
    async getAllCharacters(): Promise<Character[]> {
        return await this.repository.findAll();
    }

    /**
     * Actualiza un personaje existente
     */
    async updateCharacter(id: number, data: UpdateCharacterDTO): Promise<Character> {
        // Verificar que el personaje existe
        const existing = await this.repository.findById(id);
        
        if (!existing) {
            throw new Error(`Character with ID ${id} not found`);
        }

        // Si se está actualizando el nombre, verificar que no exista otro personaje con ese nombre
        if (data.name && data.name !== existing.name) {
            const duplicateName = await this.repository.findByName(data.name);
            
            if (duplicateName && duplicateName.id !== id) {
                throw new Error(`A character with the name '${data.name}' already exists`);
            }
        }

        // Actualizar el personaje
        const updatedCharacter = await this.repository.update(id, data);
        
        return updatedCharacter;
    }

    /**
     * Elimina un personaje
     */
    async deleteCharacter(id: number): Promise<void> {
        // Verificar que el personaje existe
        const existing = await this.repository.findById(id);
        
        if (!existing) {
            throw new Error(`Character with ID ${id} not found`);
        }

        // Eliminar el personaje
        await this.repository.delete(id);
    }
}
