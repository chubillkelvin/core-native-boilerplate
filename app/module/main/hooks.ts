import {RootState} from "app/type/state";
import {useSelector} from "react-redux";

export function useMainState<T>(fn: (state: RootState["app"]["main"]) => T): T {
    return useSelector((state: RootState) => fn(state.app.main));
}
