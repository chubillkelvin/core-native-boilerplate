import {FetchPokemonAPIResponse} from "app/type/api";

export interface State {
    welcomeText: string;
    pokemon: FetchPokemonAPIResponse | null;
}
