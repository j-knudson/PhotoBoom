import LoginScreen from "./app/screens/LoginScreen";
import LandingScreen from "./app/screens/LandingScreen";

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Landing"
                    component={LandingScreen}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    option={{title:"Login"}}
                />
            </Stack.Navigator>
        </NavigationContainer>

    );
}

export default App;