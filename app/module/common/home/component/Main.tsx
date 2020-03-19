import React, {FC} from "react";
import {StyleSheet, View, Text} from "react-native";
import {connect, DispatchProp} from "react-redux";
import {RootState} from "app/type/state";

interface StateProps {}

interface Props extends StateProps, DispatchProp {}

const HomeMain: FC<Props> = (props: Props) => {
    return (
        <View style={styles.content}>
            <Text style={styles.text}>Hello, World!</Text>
        </View>
    );
};

const mapStateToProps = (state: RootState): StateProps => {
    return {};
};

export default connect(mapStateToProps)(HomeMain);

const styles = StyleSheet.create({
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
