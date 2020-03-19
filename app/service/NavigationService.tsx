import React, {FC} from "react";
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

const Stack = createStackNavigator();

export const App: FC = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeComponent}
                    options={{
                        title: "core-native-boilerplate",
                        headerTintColor: "white",
                        headerStyle: {backgroundColor: "steelblue"},
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
