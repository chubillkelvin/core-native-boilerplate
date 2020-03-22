import React from "react";
import {StyleSheet} from "react-native";

export const globalStyles = StyleSheet.create({
    flex1: {flex: 1},
    flex2: {flex: 2},
    flex3: {flex: 3},
    flexRow: {flexDirection: "row", alignItems: "flex-start"},
    flexRowCenter: {flexDirection: "row", justifyContent: "center", alignItems: "center"},
    flex1Center: {flex: 1, justifyContent: "center", alignItems: "center"},
    absoluteFillCenter: {...StyleSheet.absoluteFillObject, justifyContent: "center", alignItems: "center"},
});
