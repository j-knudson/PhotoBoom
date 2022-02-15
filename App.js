import { StatusBar } from 'expo-status-bar';
import {useState} from "react";
import { StyleSheet, Text, View, Image } from 'react-native';

import LandingScreen from "./app/screens/LandingScreen";
import LoginScreen from "./app/screens/LoginScreen";
import ForgotLoginScreen from "./app/screens/ForgotLoginScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();


const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{title:'Mitchell test commit 1'}}
                />
                <Stack.Screen
                    name={"Landing"}
                    component={LandingScreen}
                    options={{title:"Landing Party"}}
                />
                <Stack.Screen
                    name="Forgot"
                    component={ForgotLoginScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default App;


