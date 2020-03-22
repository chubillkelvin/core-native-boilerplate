import React from "react";
import {StyleSheet, View, Button} from "react-native";
import {useDispatch} from "react-redux";
import {useHomeState} from "../hooks";
import {actions} from "../index";

export default function HomeMain() {
    const dispatch = useDispatch();
    const welcomeText = useHomeState(state => state.welcomeText);

    const changeWelcomeText = () => dispatch(actions.changeWelcomeText());

    return (
        <View style={styles.content}>
            <Button title={welcomeText} onPress={changeWelcomeText} />
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
});
