import {FetchPokemonAPIResponse} from "app/type/api";
import {NetworkService} from "../NetworkService";

// Reference: https://pokeapi.co/docs/v2.html#pokemon
export class PokemonAPIService {
    static fetchPokemon(name: string): Promise<FetchPokemonAPIResponse> {
        return NetworkService.ajax("GET", "/api/v2/pokemon/:name", {name}, null);
    }
}
