import React from "react";
import {connect, DispatchProp} from "react-redux";
import {RootState} from "app/type/state";
import {App as RootRouter} from "app/service/NavigationService";

interface StateProps {}

interface Props extends StateProps, DispatchProp {}

class AppMain extends React.PureComponent<Props> {
    render() {
        // TODO: ContextProvider, GlobalLoadingIndicator, OverlayManager
        return <RootRouter />;
    }
}

const mapStateToProps = (state: RootState): StateProps => {
    return {};
};

export default connect(mapStateToProps)(AppMain);
