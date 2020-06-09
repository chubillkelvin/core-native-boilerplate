import {Lifecycle, Module, register, SagaIterator} from "core-native";
import {State} from "./type";
import {RootState} from "app/type/state";
import {DemoMain} from "./component/Main";

const initialState: State = {};

class DemoModule extends Module<RootState, "demo"> {
    @Lifecycle()
    *onEnter(): SagaIterator {
        // TODO
    }
}

const module = register(new DemoModule("demo", initialState));
export const actions = module.getActions();
export const DemoComponent = module.attachLifecycle(DemoMain);
