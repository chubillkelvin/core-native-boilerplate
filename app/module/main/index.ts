import {Lifecycle, Module, register, SagaGenerator} from "core-native";
import {State} from "./type";
import {AppMain} from "./component/Main";
import SplashScreen from "react-native-splash-screen";
import {RootState} from "app/type/state";

const initialState: State = {};

class MainModule extends Module<RootState, "main"> {
    @Lifecycle()
    *onEnter(): SagaGenerator {
        /**
         * SplashScreen reference: https://github.com/crazycodeboy/react-native-splash-screen
         * For Android: put `launch_screen.png` into appropriate `drawable-xxxx` folder in `android/app/src/main/res`.
         * For iOS: customize splash screen via `LaunchImage` or `LaunchScreen.xib`.
         */
        setTimeout(() => SplashScreen.hide(), 2000); // TODO: demo only
    }
}

const mainModule = register(new MainModule("main", initialState));
export const actions = mainModule.getActions();
export const AppComponent = mainModule.attachLifecycle(AppMain);
