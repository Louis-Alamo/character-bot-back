export interface Character {
    id?: number;
    name: string;
    description?: string;
    avatar_url?: string;
    system_prompt: string;
    greeting_message?: string;
    temperature?: number;
    created_at?: string;
}

export interface CreateCharacterDTO {
    name: string;
    description?: string;
    avatar_url?: string;
    system_prompt: string;
    greeting_message?: string;
    temperature?: number;
}

export interface UpdateCharacterDTO {
    name?: string;
    description?: string;
    avatar_url?: string;
    system_prompt?: string;
    greeting_message?: string;
    temperature?: number;
}
