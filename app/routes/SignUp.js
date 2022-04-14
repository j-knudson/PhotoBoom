import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SignUpScreenMore from "../screens/SignUpScreenMore";
import LandingScreen from "../screens/LandingScreen";
import ForgotLoginScreen from "../screens/ForgotLoginScreen";

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {StyleSheet} from "react-native";
import SplashScreen from "../screens/SplashScreen";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function SignInStack() {
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

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SignIn"
                component={LoginSignIn}
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
    )
}
const styles = StyleSheet.create({
    tabItems: {
        //paddingTop: 10,
        backgroundColor: "red",
        marginTop: 60,
    }

});
