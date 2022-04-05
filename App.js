import LandingScreen from "./app/screens/LandingScreen";
import LoginScreen from "./app/screens/LoginScreen";
import ForgotLoginScreen from "./app/screens/ForgotLoginScreen"
import SignUpScreen from "./app/screens/SignUpScreen";
import SignUpScreenMore from "./app/screens/SignUpScreenMore";
import HomeScreen from "./app/screens/HomeScreen";
import PeersScreen from "./app/screens/Peers";
import ParentsScreen from "./app/screens/Parents";
import ProfessionalsScreen from "./app/screens/Professionals";

import Header from "./app/components/Header";
import {Colors} from "./app/components/Colors";

/*import SplashScreen from "./app/screens/SplashScreen";*/


import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useMemo, useState } from "react";


import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {StyleSheet, Text, TextComponent, Animated, Button, Platform, View,} from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

SplashScreen.preventAutoHideAsync().catch(() => {
    /* reloading the app might trigger some race conditions, ignore them */
});

function LoginSignIn() {
    return (
        <Tab.Navigator style={styles.tabItems}
                       screenOptions={{
                           //tabBarStyle: { backgroundColor: 'red'},
                           //tabBarActiveTintColor: 'red',
                           /*               indicatorStyle: {
                                              backgroundColor: "red",
                                          }*/

                       }}
        >
            <Tab.Screen name="Login" component={LoginScreen} />
            <Tab.Screen name="Sign Up" component={SignUpScreen} />
        </Tab.Navigator>
    );
}

function AuthenticatedStack() {
    return (
        <Stack.Navigator >
            <Stack.Group>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                />
                <Stack.Group>
                    <Stack.Screen
                        name="Peers"
                        component={PeersScreen}
                        options={ ( {navigation}) => {
                            return {
                                headerTitle: () =>
                                    <Header
                                        title="Peers"
                                        left="Professionals"
                                        right="Parents"
                                        navigation={navigation}
                                    />,
                                headerBackVisible: false,
                                headerStyle: {
                                    backgroundColor: Colors.secondaryGreen,
                                }
                            }
                        }}
                    />
                    <Stack.Screen
                        name="Parents"
                        component={ParentsScreen}
                        options={ ( {navigation}) => {
                            return {
                                headerTitle: () =>
                                    <Header
                                        title="Parents"
                                        left="Peers"
                                        right="Professionals"
                                        navigation={navigation}
                                    />,
                                headerBackVisible: false,
                                headerStyle: {
                                    backgroundColor: Colors.primaryBlue,
                                }
                            }
                        }}
                    />
                    <Stack.Screen
                        name="Professionals"
                        component={ProfessionalsScreen}
                        options={ ( {navigation}) => {
                            return {
                                headerTitle: () =>
                                    <Header
                                        title="Professionals"
                                        left="Parents"
                                        right="Peers"
                                        navigation={navigation}
                                    />,
                                headerBackVisible: false,
                                headerStyle: {
                                    backgroundColor: Colors.primaryRed,
                                }
                            }
                        }}
                    />
                </Stack.Group>
            </Stack.Group>

        </Stack.Navigator>
    )
}

//TODO authenticaiton workflow
/*Authenticated ? AuthenticatedStack : LoginSignIn*/

function AnimatedAppLoader({ children, image }) {
    const [isSplashReady, setSplashReady] = useState(false);

    const startAsync = useCallback(
        // If you use a local image with require(...), use `Asset.fromModule`
        () => Asset.fromURI(image).downloadAsync(),
        [image]
    );

    const onFinish = useCallback(() => setSplashReady(true), []);

    if (!isSplashReady) {
        return (
            <AppLoading
                // Instruct SplashScreen not to hide yet, we want to do this manually
                autoHideSplash={false}
                startAsync={startAsync}
                onError={console.error}
                onFinish={onFinish}
            />
        );
    }

    return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
}

function AnimatedSplashScreen({ children, image }) {
    const animation = useMemo(() => new Animated.Value(1), []);
    const [isAppReady, setAppReady] = useState(false);
    const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        if (isAppReady) {
            Animated.timing(animation, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true,
            }).start(() => setAnimationComplete(true));
        }
    }, [isAppReady]);

    const onImageLoaded = useCallback(async () => {
        try {
            await SplashScreen.hideAsync();
            // Load stuff
            await Promise.all([]);
        } catch (e) {
            // handle errors
        } finally {
            setAppReady(true);
        }
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {isAppReady && children}
            {!isSplashAnimationComplete && (
                <Animated.View
                    pointerEvents="none"
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: Constants.manifest.splash.backgroundColor,
                            opacity: animation,
                        },
                    ]}
                >
                    <Animated.Image
                        style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: Constants.manifest.splash.resizeMode || "contain",
                            transform: [
                                {
                                    scale: animation,
                                },
                            ],
                        }}
                        source={image}
                        onLoadEnd={onImageLoaded}
                        fadeDuration={0}
                    />
                </Animated.View>
            )}
        </View>
    );
}

export default function App() {
    return (

        <AnimatedAppLoader image={require('./app/assets/photoboom_logo.png')}>

            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="SignIn"
                        //component={LoginSignIn}
                        component={AuthenticatedStack}
                        //component={SplashScreen}
                        //component={SignUpScreenMore}
                        //options={{title:'PhotoBoom'}}
                        //options={{title:''}}
                        options={{ headerShown: false, marginTop: 20}}
                    />
                    <Stack.Screen
                        name="SignUpMore"
                        component={SignUpScreenMore}
                        options={({ route }) => ({title: route.params.u_email})}
                    />
                    <Stack.Screen
                        name={"Landing"}
                        component={LandingScreen}

                        options={({ route }) => ({
                            headerTitle:"Photoboom  ",
                            headerStyle: {
                                backgroundColor: '#008000',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                                fontStyle: 'italic',
                                textAlign: 'center',
                            },
                        })}
                    />
                    <Stack.Screen
                        name="Forgot"
                        component={ForgotLoginScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </AnimatedAppLoader>
    )
}



const styles = StyleSheet.create({
    tabItems: {
        //paddingTop: 10,
        backgroundColor: "red",
        marginTop: 60,
    }

});
