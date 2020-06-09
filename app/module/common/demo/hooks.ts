import {RootState} from "app/type/state";
import {useSelector} from "react-redux";

export function useDemoState<T>(fn: (state: RootState["app"]["demo"]) => T): T {
    return useSelector((state: RootState) => fn(state.app.demo));
}
