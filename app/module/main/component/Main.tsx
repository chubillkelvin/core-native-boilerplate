import React from "react";
import {StyleSheet, View, Text, SafeAreaView} from "react-native";
import {connect, DispatchProp} from "react-redux";
import {RootState} from "app/type/state";

interface StateProps {}

interface Props extends StateProps, DispatchProp {}

class AppMain extends React.PureComponent<Props> {
    render() {
        // TODO: RootRouter, ContextProvider, GlobalLoadingIndicator, OverlayManager
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.text}>core-native-boilerplate</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.text}>Hello, World!</Text>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state: RootState): StateProps => {
    return {};
};

export default connect(mapStateToProps)(AppMain);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "stretch",
        backgroundColor: "steelblue",
    },
    header: {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 24,
    },
});
