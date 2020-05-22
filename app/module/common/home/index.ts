import {call, Lifecycle, Log, Module, register, SagaIterator} from "core-native";
import {State} from "./type";
import {HomeMain} from "./component/Main";
import {PokemonAPIService} from "app/service/api/PokemonAPIService";
import {RootState} from "app/type/state";

const initialState: State = {
    welcomeText: "I am a button, press me!",
    pokemon: null,
    someData: ["Line 1", "Line 2", "Line 3"],
};

class HomeModule extends Module<RootState, "home", {testParam: string}> {
    @Lifecycle()
    *onEnter(params: {testParam: string}): SagaIterator {
        console.info("Home onEnter", JSON.stringify(params));
    }

    @Log()
    *changeWelcomeText(): SagaIterator {
        // Normal usage of setState similar to React's setState
        this.setState({welcomeText: "Hello, World!"});
    }

    @Log()
    *fetchPokemon(name: string): SagaIterator {
        const pokemon = yield* call(PokemonAPIService.fetchPokemon, name);
        this.setState({pokemon});
    }

    @Log()
    *addLine(): SagaIterator {
        // Example usage of setState with Immer
        this.setState(state => state.someData.push(`Line ${state.someData.length + 1}`));
    }
}

const module = register(new HomeModule("home", initialState));
export const actions = module.getActions();
export const HomeComponent = module.attachLifecycle(HomeMain);
