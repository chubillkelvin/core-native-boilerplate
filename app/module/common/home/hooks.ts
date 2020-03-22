import {RootState} from "app/type/state";
import {useSelector} from "react-redux";

export function useHomeState<T>(fn: (state: RootState["app"]["home"]) => T): T {
    return useSelector((state: RootState) => fn(state.app.home));
}
