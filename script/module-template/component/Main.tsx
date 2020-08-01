import React from "react";
import {StyleSheet, View} from "react-native";

export const Main = React.memo(() => {
    return <View />;
});

Main.displayName = "Main";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
