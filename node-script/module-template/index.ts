import {Lifecycle, Module, register, SagaIterator} from "core-native";
import {State} from "./type";
import {2}Main from "./component/Main";

const initialState: State = {
    welcomeText: "Press Me!",
};

class {2}Module extends Module<State> {
    @Lifecycle()
    *onEnter(): SagaIterator {
        // TODO
    }
}

const module = register(new {2}Module("{1}", initialState));
export const actions = module.getActions();
export const {2}Component = module.attachLifecycle({2}Main);
