import {call, Lifecycle, Log, Module, register, SagaGenerator} from "core-native";
import {State} from "./type";
import {HomeMain} from "./component/Main";
import {PokemonAPIService} from "app/service/api/PokemonAPIService";
import {RootState} from "app/type/state";
import {NavigationService} from "app/service/NavigationService";

const initialState: State = {
    welcomeText: "I am a button, press me!",
    pokemon: null,
    someData: ["Line 1", "Line 2", "Line 3"],
};

class HomeModule extends Module<RootState, "home", {testParam: string}> {
    @Lifecycle()
    *onEnter(params: {testParam: string}): SagaGenerator {
        console.info("Home onEnter", JSON.stringify(params));
    }

    @Log()
    *changeWelcomeText(): SagaGenerator {
        // Normal usage of setState similar to React's setState
        this.setState({welcomeText: "Hello, World!"});
    }

    @Log()
    *fetchPokemon(name: string): SagaGenerator {
        const pokemon = yield* call(PokemonAPIService.fetchPokemon, name);
        this.setState({pokemon});
    }

    @Log()
    *addLine(): SagaGenerator {
        // Example usage of setState with Immer
        this.setState(state => state.someData.push(`Line ${state.someData.length + 1}`));
    }

    @Log()
    *goToDemoPage(): SagaGenerator {
        NavigationService.push("Demo");
    }
}

const homeModule = register(new HomeModule("home", initialState));
export const actions = homeModule.getActions();
export const HomeComponent = homeModule.attachLifecycle(HomeMain);
