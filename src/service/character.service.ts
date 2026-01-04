import { Character, CreateCharacterDTO } from "../interface/character";
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
}
