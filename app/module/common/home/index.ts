import {call, Lifecycle, Log, Module, register, SagaIterator} from "core-native";
import {State} from "./type";
import HomeMain from "./component/Main";
import {PokemonAPIService} from "app/service/api/PokemonAPIService";

const initialState: State = {
    welcomeText: "I am a button, press me!",
    pokemon: null,
};

class HomeModule extends Module<State, {testParam: string}> {
    @Lifecycle()
    *onEnter(params: {testParam: string}): SagaIterator {
        console.info("Home onEnter", JSON.stringify(params));
    }

    @Log()
    *changeWelcomeText(): SagaIterator {
        this.setState({welcomeText: "Hello, World!"});
    }

    @Log()
    *fetchPokemon(name: string): SagaIterator {
        const pokemon = yield* call(PokemonAPIService.fetchPokemon, name);
        this.setState({pokemon});
    }
}

const module = register(new HomeModule("home", initialState));
export const actions = module.getActions();
export const HomeComponent = module.attachLifecycle(HomeMain);
