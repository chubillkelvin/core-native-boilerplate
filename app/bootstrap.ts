import "react-native-gesture-handler";
import appConfig from "app/conf/default";
import {startApp} from "core-native";
import {LogBox, UIManager} from "react-native";
import {NetworkService} from "app/service/NetworkService";
import {ErrorHandler} from "app/module/ErrorHandler";
import {AppComponent} from "app/module/main";
import {Device} from "./service/Device";

export function bootstrap() {
    // LayoutAnimation support on Android
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    startApp({
        registeredAppName: "CoreNativeBoilerplate",
        componentType: AppComponent,
        errorListener: new ErrorHandler(),
        beforeRendering: async () => {
            LogBox.ignoreLogs(["Require cycle", "Async storage"]);
            await Device.getDeviceInfo();
            await NetworkService.init(appConfig.apiURL);
        },
    });
}
