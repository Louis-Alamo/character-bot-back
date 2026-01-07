import { database } from "../config/database";
import { Character, CreateCharacterDTO, UpdateCharacterDTO } from "../interface/character";

/**
 * Repository para operaciones de base de datos de personajes
 */
export class CharacterRepository {
    
    /**
     * Crea un nuevo personaje en la base de datos
     */
    async create(data: CreateCharacterDTO): Promise<Character> {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO characters (name, description, avatar_url, system_prompt, greeting_message, temperature)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            const params = [
                data.name,
                data.description || null,
                data.avatar_url || null,
                data.system_prompt,
                data.greeting_message || null,
                data.temperature || 0.7,
            ];

            database.run(query, params, function (err) {
                if (err) {
                    reject(err);
                    return;
                }

                // Obtener el registro recién creado
                const selectQuery = `SELECT * FROM characters WHERE id = ?`;
                
                database.get(selectQuery, [this.lastID], (err, row: Character) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(row);
                });
            });
        });
    }

    /**
     * Obtiene un personaje por su ID
     */
    async findById(id: number): Promise<Character | undefined> {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM characters WHERE id = ?`;
            
            database.get(query, [id], (err, row: Character) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });
    }

    /**
     * Obtiene todos los personajes
     */
    async findAll(): Promise<Character[]> {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM characters ORDER BY created_at DESC`;
            
            database.all(query, [], (err, rows: Character[]) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });
    }

    /**
     * Busca un personaje por nombre
     */
    async findByName(name: string): Promise<Character | undefined> {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM characters WHERE name = ? LIMIT 1`;
            
            database.get(query, [name], (err, row: Character) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });
    }

    /**
     * Actualiza un personaje existente
     */
    async update(id: number, data: UpdateCharacterDTO): Promise<Character> {
        return new Promise((resolve, reject) => {
            // Construir query dinámica solo con los campos proporcionados
            const fields: string[] = [];
            const params: any[] = [];

            if (data.name !== undefined) {
                fields.push("name = ?");
                params.push(data.name);
            }
            if (data.description !== undefined) {
                fields.push("description = ?");
                params.push(data.description);
            }
            if (data.avatar_url !== undefined) {
                fields.push("avatar_url = ?");
                params.push(data.avatar_url);
            }
            if (data.system_prompt !== undefined) {
                fields.push("system_prompt = ?");
                params.push(data.system_prompt);
            }
            if (data.greeting_message !== undefined) {
                fields.push("greeting_message = ?");
                params.push(data.greeting_message);
            }
            if (data.temperature !== undefined) {
                fields.push("temperature = ?");
                params.push(data.temperature);
            }

            // Agregar el ID al final de los parámetros
            params.push(id);

            const query = `UPDATE characters SET ${fields.join(", ")} WHERE id = ?`;

            database.run(query, params, function (err) {
                if (err) {
                    reject(err);
                    return;
                }

                // Obtener el registro actualizado
                const selectQuery = `SELECT * FROM characters WHERE id = ?`;
                
                database.get(selectQuery, [id], (err, row: Character) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(row);
                });
            });
        });
    }

    /**
     * Elimina un personaje por su ID
     */
    async delete(id: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM characters WHERE id = ?`;
            
            database.run(query, [id], function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                
                // this.changes indica cuántas filas fueron afectadas
                resolve(this.changes > 0);
            });
        });
    }
}
