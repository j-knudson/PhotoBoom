import LandingScreen from "./app/screens/LandingScreen";
import LoginScreen from "./app/screens/LoginScreen";
import ForgotLoginScreen from "./app/screens/ForgotLoginScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Button, Text} from "react-native-web";


const Stack = createNativeStackNavigator();


const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    //options={{title:'PhotoBoom'}}
                    options={{title:''}}
                />
                <Stack.Screen
                    name={"Landing"}
                    component={LandingScreen}

                    options={({ route }) => ({
                        headerTitle:"Photoboom  " ,
/*                        headerRight: ()=> (
                            <Text style={{color: "white", fontWeight: 'bold'}}> Hello: {route.params.itemID} </Text>
                        ),*/
/*                        headerRight: ()=> (
                            <Button
                                onPress={() => alert('This is a button!')}
                                title="Info"
                                color="#fff"
                            />
                        ),*/
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


export default App;


