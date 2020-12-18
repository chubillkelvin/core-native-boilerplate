import {Lifecycle, Module, register, SagaGenerator} from "core-native";
import {State} from "./type";
import {RootState} from "app/type/state";
import {DemoMain} from "./component/Main";

const initialState: State = {};

class DemoModule extends Module<RootState, "demo"> {
    @Lifecycle()
    *onEnter(): SagaGenerator {
        // TODO
    }
}

const demoModule = register(new DemoModule("demo", initialState));
export const actions = demoModule.getActions();
export const DemoComponent = demoModule.attachLifecycle(DemoMain);
