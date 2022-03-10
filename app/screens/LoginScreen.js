import React, {useState} from 'react';
import { StatusBar} from "expo-status-bar";
/*import React from 'react';*/
import {
    Alert,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image, Button,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import stringifySafe from "react-native/Libraries/Utilities/stringifySafe";

import AsyncStorage from '@react-native-async-storage/async-storage';





WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({navigation}) => {

    function clickCounter(buttonName) {
        console.log(buttonName)
        if (localStorage.getItem(buttonName)) {
            localStorage.setItem(buttonName, stringifySafe(Number(localStorage.getItem(buttonName))+1));
        } else {
            localStorage.setItem(buttonName, "1");
        }
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] =  useState('');

    const onLoginPress = () => {
        Alert.alert('Login Press', "You pressed the log me in button")
        navigation.navigate('Landing', {
            itemID : email,
            newEmail: password,
            testString: 'This is my test message'
        });
    }

    const [accessToken, setAccessToken] = React.useState();
    const [userInfo, setUserInfo] = React.useState();
    const [message, setMessage] = React.useState();

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '668793616964-4t8885n5ahg6lhsre569ivvlnps2c9e2.apps.googleusercontent.com',
        iosClientId: '668793616964-qv1f3av811hrhdmdfiq46ue49nas25hv.apps.googleusercontent.com',
        androidClientId: '668793616964-0reltth60ectsb34e77trphv10f3team.apps.googleusercontent.com',
        webClientId: '668793616964-ghs8734d1vrjhj8b12cfk21vhte87lc0.apps.googleusercontent.com',
    });

    // <Cookies>

        const [isLoading, setIsLoading] = React.useState(true);
        const [loginCounter, setLoginCounter] = React.useState(0);
        const [forgotCounter, setForgotCounter] = React.useState(0);

    const getData = async () => {
        //Multiget
        const values = await AsyncStorage.multiGet(['@forgotCount', '@loginCount']);

        values.forEach(value => {
            if (value[0] === '@forgotCount') {
                const count = parseInt(value[1]);
                setForgotCounter(isNaN(count) ? 0 : count);
            } else if(value[0] === '@loginCount') {
                const loginCount = parseInt(value[1]);
                setLoginCounter(isNaN(loginCount) ? 0: loginCount);
            }
        });

        setIsLoading(false);
    };


        React.useEffect(getData);

/*        if (isLoading) {
            return (
                <Text style={styles.TextTitle}>Loading...</Text>
            );
        }*/


        const incrementLoginCounter = async () => {
            await AsyncStorage.setItem('@loginCount', (loginCounter + 1).toString());
            setLoginCounter(loginCounter + 1);
        }

        const incrementForgotCounter = async () => {
            await AsyncStorage.setItem('@forgotCount', (forgotCounter + 1).toString());
            setForgotCounter(forgotCounter + 1);
        }

    // </Cookies>

    React.useEffect(() => {
        setMessage(JSON.stringify(response));
        if (response?.type === "success") {
            setAccessToken(response.authentication.accessToken);
        }
    }, [response]);

    async function getUserData() {
        let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: { Authorization: `Bearer ${accessToken}`}
        });

        userInfoResponse.json().then(data => {
            setUserInfo(data);
        });
    }

    function showUserInfo() {
        if (userInfo) {
            return (
                <View style={styles.userInfo}>
                    <Image source={{uri: userInfo.picture}} style={styles.profilePic} />
                    <Text>Welcome {userInfo.name}</Text>
                    <Text>{userInfo.email}</Text>
                </View>
            );
        }
    }

    return (
        <View style={styles.container}>
            <Image
                resizeMode = {"contain"}
                style={styles.photoboomText}
                source={require("../assets/photo_boom_text.png")}
            />
            <Image
                resizeMode = {"contain"}
                style={styles.image2}
                source={require("../assets/weblogo.png")}
            />
            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.text}
                    placeholder="Enter Email"
                    placeholderTextColor="white"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.text}
                    placeholder="Enter Password"
                    placeholderTextColor="white"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                    onKeyPress = {event =>  {
                        if (event.key === 'Enter') {
                            onLoginPress()
                        }
                    }}
                />
            </View>

{/*            <TouchableOpacity onPress={()=>{clickCounter("ForgotPW"),navigation.navigate('Forgot')}}>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>*/}

            <TouchableOpacity onPress={()=>{incrementForgotCounter(), navigation.navigate('Forgot')}}>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>

            <Text>This is how many times you've forgotten your password: {forgotCounter}</Text>
            <Text>This is how many times the login button has been clicked {loginCounter}</Text>
{/*            <div>
                <Text>This is how many times you've forgotten your password {localStorage.getItem("ForgotPW")}</Text>
                <br></br>
                <Text>This is how many times the login button has been clicked {localStorage.getItem("Login")}</Text>
            </div>*/}

 {/*           <TouchableOpacity   style={styles.loginBtn}  >
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>*/}
            {showUserInfo()}
{/*            <TouchableOpacity onPress={()=>{clickCounter("Login"),onLoginPress()}}>
                <Text>Login</Text>
            </TouchableOpacity>*/}
            <Button
                title="Login"
                color="red"
                onPress={()=>{incrementLoginCounter(), onLoginPress()}}
            />


            <TouchableOpacity style={styles.googleButtonContainer} onPress={accessToken ? getUserData : () => { promptAsync({useProxy: false, showInRecents: true}) }}>
                <Image
                    //resizeMode={"contain"}
                    style={styles.googleButtonImage}
                    source={require("../assets/btn_google_signin_dark_normal_web2x.png")}
                />
            </TouchableOpacity>


        </View>
    );

   /*  onbeforeunload(This is where we need to send the information somewhere
   we will send each individual button clicks by using localstorage.getItem(button name here))
    */
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "whitesmoke",
        alignItems: "center",
        justifyContent: "center",
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
        color: "black",
    },
    googleButtonContainer: {
        flex: 1,
        width: '50%',
        height: '50%',
        alignItems: 'center',
        resizeMode: 'contain'
    },
    googleButtonImage: {
      //flex: 1,
      width: '70%',
      height: '70%',
      resizeMode:'contain',
    },

    image2: {
        flex: 1,
        width: '30%',
        height: '30%',
        resizeMode: 'contain'
    },

    inputView: {
        backgroundColor: "blue",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,

        alignItems: "center",
        justifyContent: "center",
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "lime",
    },

    loginText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
        //backgroundColor: "#000000c0"

    },

    text: {
        color: "white",
        fontSize: 32,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
        //backgroundColor: "#000000c0"
    },


    photoboomText: {
        flex: 1,
        width: '70%',
        height: '25%',
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    TextInput2: {
        textAlign: "center",
        color: 'white',
    },

    TextTitle: {
        color: "red",
        fontSize: 32,
        //lineHeight: 84,
        fontWeight: "bold",
        fontStyle: "italic",
    }
});


export default LoginScreen;
