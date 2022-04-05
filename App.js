import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useMemo, useState } from "react";
import {NavigationContainer} from "@react-navigation/native";

import {StyleSheet, Text, TextComponent, Animated, Button, Platform, View,} from "react-native";

//avigators
import SignInNavigator from './app/routes/SignUp'
import AuthenticatedNavigator from "./app/routes/Authenticated";


SplashScreen.preventAutoHideAsync().catch(() => {
    /* reloading the app might trigger some race conditions, ignore them */
});

function AnimatedAppLoader({ children, image }) {
    const [isSplashReady, setSplashReady] = useState(false);

    const startAsync = useCallback(
        // If you use a local image with require(...), use `Asset.fromModule`
        () => Asset.fromModule(image).downloadAsync(),
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
                            paddingTop: 798,
                            alignSelf: "center",
                            width: "90%",
                            height: "90%",
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
//TODO authentication workflow  replace authenticated with secure store token

let Authenticated = false;

    export default function App() {
        return (
            <AnimatedAppLoader image={require('./app/assets/photoboom_logo.png')}>
                <NavigationContainer>
                    {Authenticated == false ? (
                        <SignInNavigator />
                        ) : (
                        <AuthenticatedNavigator />
                    )}
                </NavigationContainer>
            </AnimatedAppLoader>
        )
    }



