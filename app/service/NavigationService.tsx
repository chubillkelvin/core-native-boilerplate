import React from "react";
import {HomeComponent} from "../module/common/home";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

export const App = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeComponent} options={{title: "core-native-boilerplate", headerTintColor: "white", headerStyle: {backgroundColor: "steelblue"}}} />
        </Stack.Navigator>
    </NavigationContainer>
);
