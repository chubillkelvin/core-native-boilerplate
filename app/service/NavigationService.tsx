import React from "react";
import {HomeComponent} from "../module/common/home";
import {NavigationContainer, NavigationContainerRef, StackActions} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {ParamListBase} from "@react-navigation/routers";

/**
 * Navigation without the navigation prop
 * ref: https://reactnavigation.org/docs/navigating-without-navigation-prop/
 */
const navigationRef = React.createRef<NavigationContainerRef>();

export const navigate = (name: keyof ParamListBase, params: ParamListBase) => {
    navigationRef.current?.navigate(name, params);
};

export const push = (name: keyof ParamListBase, params: ParamListBase) => {
    navigationRef.current?.dispatch(StackActions.push(name, params));
};

/**
 * Navigators and Screens
 * Structure reference from: https://akveo.github.io/react-native-ui-kitten/docs/guides/configure-navigation#create-navigator
 */

const {Navigator, Screen} = createStackNavigator();

const HomeNavigator = () => (
    <Navigator initialRouteName="Home">
        <Screen
            name="Home"
            initialParams={{testParam: "Hello"}}
            component={HomeComponent}
            options={{
                title: "core-native-boilerplate",
                headerTintColor: "white",
                headerStyle: {backgroundColor: "steelblue"},
            }}
        />
    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer ref={navigationRef}>
        <HomeNavigator />
    </NavigationContainer>
);
