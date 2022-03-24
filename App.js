import LandingScreen from "./app/screens/LandingScreen";
import LoginScreen from "./app/screens/LoginScreen";
import ForgotLoginScreen from "./app/screens/ForgotLoginScreen";
import SignUpScreen from "./app/screens/SignUpScreen";


import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {StyleSheet} from "react-native";

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

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={LoginSignIn}
                    //options={{title:'PhotoBoom'}}
                    options={{title:''}}
                />
                <Stack.Screen
                    name={"Landing"}
                    component={LandingScreen}

                    options={({ route }) => ({
                        headerTitle:"Photoboom  ",
                        headerStyle: {
                            backgroundColor: '#008000'
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
    }

});

export default App;


