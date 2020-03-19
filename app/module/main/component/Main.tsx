import React, {FC} from "react";
import {connect, DispatchProp} from "react-redux";
import {RootState} from "app/type/state";
import {App as RootRouter} from "app/service/NavigationService";

interface StateProps {}

interface Props extends StateProps, DispatchProp {}

const AppMain: FC<Props> = (props: Props) => {
    // TODO: ContextProvider, GlobalLoadingIndicator, OverlayManager
    return <RootRouter />;
};

const mapStateToProps = (state: RootState): StateProps => {
    return {};
};

export default connect(mapStateToProps)(AppMain);
