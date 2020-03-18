import {State as MainState} from "app/module/main/type";
import {State as HomeState} from "app/module/common/home/type";
import {State} from "core-native";

export interface RootState extends State {
    app: {
        main: MainState;
        home: HomeState;
    };
}
