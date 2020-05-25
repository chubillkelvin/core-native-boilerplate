import React from "react";
import {AppNavigator as RootRouter} from "app/service/NavigationService";

export const AppMain = React.memo(() => {
    // TODO: ContextProvider, GlobalLoadingIndicator, OverlayManager
    return <RootRouter />;
});

AppMain.displayName = "AppMain";
