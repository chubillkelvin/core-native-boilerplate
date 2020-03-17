import {Lifecycle, Module, register, SagaIterator} from "core-native";
import {State} from "./type";
import AppMain from "./component/Main";

const initialState: State = {};

class MainModule extends Module<State> {
    @Lifecycle()
    *onEnter(): SagaIterator {
        // TODO
    }
}

const module = register(new MainModule("main", initialState));
export const actions = module.getActions();
export const AppComponent = module.attachLifecycle(AppMain);
