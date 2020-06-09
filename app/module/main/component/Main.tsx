import React from "react";
import {AppNavigator} from "app/service/NavigationService";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {StatusBar} from "react-native";

export const AppMain = React.memo(() => {
    // TODO: e.g. ContextProvider, GlobalLoadingIndicator, OverlayManager...
    return (
        <SafeAreaProvider>
            <StatusBar />
            <AppNavigator />
        </SafeAreaProvider>
    );
});

AppMain.displayName = "AppMain";
