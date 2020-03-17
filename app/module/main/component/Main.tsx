import React from "react";
import {StyleSheet, View, Text} from "react-native";
import {connect, DispatchProp} from "react-redux";
import {RootState} from "app/type/state";

interface StateProps {}

interface Props extends StateProps, DispatchProp {}

class AppMain extends React.PureComponent<Props> {
    render() {
        // TODO: RootRouter, ContextProvider, GlobalLoadingIndicator, OverlayManager
        return (
            <View style={styles.container}>
                <Text>core-native-boilerplate</Text>
            </View>
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
    },
});
