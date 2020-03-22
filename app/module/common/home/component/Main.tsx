import React, {useEffect} from "react";
import {StyleSheet, View, Button, Image} from "react-native";
import {useDispatch} from "react-redux";
import {useHomeState} from "../hooks";
import {actions} from "../index";
import {globalStyles} from "app/util/globalDefinition";
import {useModuleAction} from "core-native";

export default function HomeMain() {
    const dispatch = useDispatch();

    // welcomeText
    const welcomeText = useHomeState(state => state.welcomeText);
    const changeWelcomeText = () => dispatch(actions.changeWelcomeText());

    // pokemon
    const pokemon = useHomeState(state => state.pokemon);
    const fetchPokemon = useModuleAction(actions.fetchPokemon, "pikachu");
    useEffect(() => {
        fetchPokemon();
    }, [fetchPokemon]);

    return (
        <View style={[globalStyles.flex1Center, styles.container]}>
            {pokemon && <Image source={{uri: pokemon.sprites.front_default}} style={styles.image} />}
            <Button title={welcomeText} onPress={changeWelcomeText} />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
    },
    container: {
        backgroundColor: "white",
    },
});
