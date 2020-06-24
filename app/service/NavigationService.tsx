import React from "react";
import {HomeComponent} from "app/module/common/home";
import {DemoComponent} from "app/module/common/demo";
import {NavigationContainer, NavigationContainerRef, StackActions, NavigationState} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {ParamListBase} from "@react-navigation/routers";
import AsyncStorage from "@react-native-community/async-storage";
import {Linking, Platform} from "react-native";

/**
 * Navigation without the navigation prop
 * ref: https://reactnavigation.org/docs/navigating-without-navigation-prop/
 */
const navigationRef = React.createRef<NavigationContainerRef>();

// Push a new screen on top if doesn't exist; else simply show the existing screen on stack
const navigate = (name: keyof ParamListBase, params?: ParamListBase) => {
    navigationRef.current?.navigate(name, params);
};

// Always push a new screen on top
const push = (name: keyof ParamListBase, params?: ParamListBase) => {
    navigationRef.current?.dispatch(StackActions.push(name, params));
};

// Go back one screen
const goBack = () => {
    const current = navigationRef.current;
    if (current) {
        current.canGoBack() && current.goBack();
    }
};

// Pop all screens on current stack
const popToTop = () => {
    const current = navigationRef.current;
    if (current) {
        current.canGoBack() && current.dispatch(StackActions.popToTop());
    }
};

/**
 * Navigators and Screens
 * Structure reference from: https://akveo.github.io/react-native-ui-kitten/docs/guides/configure-navigation#create-navigator
 */

const Stack = createStackNavigator();

const HomeNavigator = () => (
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
            name="Home"
            initialParams={{testParam: "Hello"}}
            component={HomeComponent}
            options={{
                title: "core-native-boilerplate",
                headerTintColor: "white",
                headerStyle: {backgroundColor: "steelblue"},
            }}
        />
        <Stack.Screen name="Demo" component={DemoComponent} options={{title: "Navigation Demo Page"}} />
    </Stack.Navigator>
);

HomeNavigator.displayName = "HomeNavigator";

/**
 * App Navigator
 */

const persistenceKey = "dev.route";

const persistNavigationState = (state: NavigationState | undefined) => AsyncStorage.setItem(persistenceKey, JSON.stringify(state));

const loadNavigationState = async () => {
    try {
        const jsonString = await AsyncStorage.getItem(persistenceKey);
        const ISO_DATE_FORMAT = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(\.\d+)?(Z|[+-][01]\d:[0-5]\d)$/;
        return jsonString
            ? JSON.parse(jsonString, (key: any, value: any) => {
                  if (typeof value === "string" && ISO_DATE_FORMAT.test(value)) {
                      return new Date(value);
                  }
                  return value;
              })
            : null;
    } catch (e) {
        return null;
    }
};

export const AppNavigator = () => {
    /**
     * Navigation State Persistence
     * ref: https://reactnavigation.org/docs/state-persistence/
     */
    const [isReady, setIsReady] = React.useState(false);
    const [initialState, setInitialState] = React.useState();

    React.useEffect(() => {
        const restoreState = async () => {
            try {
                const initialUrl = await Linking.getInitialURL();

                if (Platform.OS !== "web" && initialUrl == null) {
                    // Only restore state if there's no deep link and we're not on web
                    const state = await loadNavigationState();

                    if (state !== undefined) {
                        setInitialState(state);
                    }
                }
            } finally {
                setIsReady(true);
            }
        };

        if (!isReady) {
            restoreState();
        }
    }, [isReady]);

    if (!isReady) {
        return null;
    }
    return (
        <NavigationContainer ref={navigationRef} initialState={initialState} onStateChange={persistNavigationState}>
            <HomeNavigator />
        </NavigationContainer>
    );
};

AppNavigator.displayName = "AppNavigator";

export const NavigationService = {
    navigate,
    push,
    goBack,
    popToTop,
};
