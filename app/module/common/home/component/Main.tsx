import React from "react";
import {StyleSheet, View, Button} from "react-native";
import {useDispatch} from "react-redux";
import {useHomeState} from "../hooks";
import {actions} from "../index";
import {globalStyles} from "app/util/globalDefinition";

export default function HomeMain() {
    const dispatch = useDispatch();
    const welcomeText = useHomeState(state => state.welcomeText);

    const changeWelcomeText = () => dispatch(actions.changeWelcomeText());

    return (
        <View style={[globalStyles.flex1Center, styles.container]}>
            <Button title={welcomeText} onPress={changeWelcomeText} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
    },
});
