export interface FetchPokemonAPIResponse {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: Array<any>;
    forms: Array<any>;
    game_indices: Array<any>;
    held_items: Array<any>;
    location_area_encounters: string;
    moves: Array<any>;
    sprites: PokemonSprites;
    species: any;
    stats: Array<any>;
    types: Array<any>;
}

interface PokemonSprites {
    front_default: string;
    front_shiny: string;
    front_female: string;
    front_shiny_female: string;
    back_default: string;
    back_shiny: string;
    back_female: string;
    back_shiny_female: string;
}
