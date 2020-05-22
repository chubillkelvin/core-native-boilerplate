import React from "react";
import {StyleSheet, View} from "react-native";
import {useDispatch} from "react-redux";

export const {1} = React.memo(() => {
    const dispatch = useDispatch();

    return <View />;
});

{1}.displayName = "{1}";

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
