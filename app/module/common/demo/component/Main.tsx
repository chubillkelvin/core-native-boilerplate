import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {globalStyles} from "app/util/globalDefinition";

export const DemoMain = React.memo(() => {
    return (
        <View style={[globalStyles.flex1Center, styles.container]}>
            <Text>Demo</Text>
        </View>
    );
});

DemoMain.displayName = "DemoMain";

const styles = StyleSheet.create({
    container: {
        padding: 12,
    },
});
