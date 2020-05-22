import React, {useEffect} from "react";
import {StyleSheet, View, Button, Image, Text, ActivityIndicator, FlatList} from "react-native";
import {useHomeState} from "../hooks";
import {actions} from "../index";
import {globalStyles} from "app/util/globalDefinition";
import {useModuleAction} from "core-native";

export const HomeMain = React.memo(() => {
    // welcomeText
    const welcomeText = useHomeState(state => state.welcomeText);
    const changeWelcomeText = useModuleAction(actions.changeWelcomeText);

    // pokemon
    const pokemon = useHomeState(state => state.pokemon);
    const fetchPokemon = useModuleAction(actions.fetchPokemon, "pikachu");
    useEffect(() => {
        fetchPokemon();
    }, [fetchPokemon]);

    // someData
    const someData = useHomeState(state => state.someData);
    const addLine = useModuleAction(actions.addLine);
    const renderSomeDataItem = ({item}: {item: string}) => <Text>{item}</Text>;

    return (
        <View style={[globalStyles.flex1Center, styles.container]}>
            <Button title={welcomeText} onPress={changeWelcomeText} />
            {pokemon ? <Image source={{uri: pokemon.sprites.front_default}} style={styles.image} /> : <ActivityIndicator size="large" color="#00ff00" />}
            <Button title="Press Me To Add A Line Below" onPress={addLine} />
            <FlatList data={someData} renderItem={renderSomeDataItem} keyExtractor={item => item} />
        </View>
    );
});

HomeMain.displayName = "HomeMain";

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
    },
    container: {
        backgroundColor: "white",
    },
});
