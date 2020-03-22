import {Lifecycle, Log, Module, register, SagaIterator} from "core-native";
import {State} from "./type";
import HomeMain from "./component/Main";

const initialState: State = {
    welcomeText: "Press Me!",
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
}

const module = register(new HomeModule("home", initialState));
export const actions = module.getActions();
export const HomeComponent = module.attachLifecycle(HomeMain);
