import LandingScreen from "./app/screens/LandingScreen";
import LoginScreen from "./app/screens/LoginScreen";
import ForgotLoginScreen from "./app/screens/ForgotLoginScreen"
import SignUpScreen from "./app/screens/SignUpScreen";
import SignUpScreenMore from "./app/screens/SignUpScreenMore";
import HomeScreen from "./app/screens/HomeScreen";
import PeersScreen from "./app/screens/Peers";
import ParentsScreen from "./app/screens/Parents";
import ProfessionalsScreen from "./app/screens/Professionals";

import SplashScreen from "./app/screens/SplashScreen";

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {StyleSheet, Text, TextComponent} from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

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
                    />
                    <Stack.Screen
                        name="Parents"
                        component={ParentsScreen}
                    />
                    <Stack.Screen
                        name="Professionals"
                        component={ProfessionalsScreen}
                    />
                </Stack.Group>
            </Stack.Group>

        </Stack.Navigator>
    )
}

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="SignIn"
                    //component={LoginSignIn}
                    component={AuthenticatedStack}
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
    )
}

const styles = StyleSheet.create({
    tabItems: {
        //paddingTop: 10,
        backgroundColor: "red",
        marginTop: 60,
    }

});

export default App;


