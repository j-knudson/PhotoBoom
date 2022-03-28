import React, {useState} from 'react';
import { StatusBar} from "expo-status-bar";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image, Button,
} from 'react-native';

//icons
import {Octicons} from '@expo/vector-icons';

import {Formik} from "formik";
import * as yup from 'yup'

import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

import AsyncStorage from '@react-native-async-storage/async-storage';
import customStyle from "../components/styles";

import axios from 'axios';





WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({navigation}) => {


    const [email, setEmail] = useState('');
    const [password, setPassword] =  useState('');

    const onLoginPress = () => {
        Alert.alert('Login Press', "You pressed the log me in button")
        navigation.navigate('Landing', {
            itemID : email,
            newEmail: password,
            testString: 'This is my test message',
        });
    }

    // <Google OAuth> -------------------------------------------------------------------------------------
    const [accessToken, setAccessToken] = React.useState();
    const [userInfo, setUserInfo] = React.useState();
    const [message, setMessage] = React.useState();
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '837731496311-8nb4dc273uvhttev27tso91iv0ghst8f.apps.googleusercontent.com',
/*        iosClientId: '668793616964-qv1f3av811hrhdmdfiq46ue49nas25hv.apps.googleusercontent.com',
        androidClientId: '668793616964-0reltth60ectsb34e77trphv10f3team.apps.googleusercontent.com',*/
        webClientId: '837731496311-7nm5sbgj8ja4mj34ja1332j3ko0106va.apps.googleusercontent.com',
    });

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

    async function onGooglePress() {
        let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: { Authorization: `Bearer ${accessToken}`}
        });

        await userInfoResponse.json().then(data => {
            navigation.navigate('Landing',{
                testString: "This message is coming from Google",
                userData: data
            })
        });

        Alert.alert( 'Google Press', "You signed in with google")

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
    // </Google OAuth> --------------------------------------------------------------------------------------------

    // <Cookies> --------------------------------------------------------------------------------------------------
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

    // </Cookies> -------------------------------------------------------------------------------------------------



    return (
        <View style={styles.container}>
            <View style={customStyle.innerContainer}>
                <Image
                resizeMode={"contain"}
                style={styles.photoboomText}
                source={require("../assets/photo_boom_text.png")}
                />
                <Image
                    resizeMode={"contain"}
                    style={styles.image2}
                    source={require("../assets/photoboom_logo.png")}
                />

            <StatusBar style="auto" />


                <View style={customStyle.loginContainer}>
                    <Formik
                        validationSchema={loginValidationSchema}
                        initialValues={{email: '', password: ''}}
                        onSubmit={values => console.log(values)}
                    >
                            {({
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              values,
                              errors,
                              isValid,
                            }) => (
                            <>
                            <View style={customStyle.TextInputArea}>
                                <View style={customStyle.leftIcon}>
                                    <Octicons name="mail" size={30} color="red"/>
                                </View>
                                <TextInput
                                    style={customStyle.text}
                                    name="email"
                                    placeholder="Email Address"
                                    placeholderTextColor="white"
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                {errors.email &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                                }
                                {errors.password &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                                }
                                <View style={customStyle.rightIcon}/>
                            </View>
                            <View style={customStyle.TextInputArea}>
                                <View style={customStyle.leftIcon}>
                                    <Octicons name="lock" size={30} color="red"/>
                                </View>
                                <TextInput
                                    name="password"
                                    placeholder="Password"
                                    placeholderTextColor="white"
                                    style={customStyle.text}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry
                                />
                                <View style={customStyle.rightIcon}>
                                    <Octicons name="eye" size={30} color="red"/>
                                </View>
                            </View>
                                <Button onPress={handleSubmit} title="Submit" color="red"/>
                            </>
                        )}
                    </Formik>
                </View>



            <TouchableOpacity onPress={()=>{incrementForgotCounter(), navigation.navigate('Forgot')}}>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>

            {showUserInfo()}

            <Button
                title="Login"
                color="red"
                onPress={()=>{
                    incrementLoginCounter();
                    const res = axios.post('http://10.0.2.2:3000/users',{email: email, password: password}).then(function(result){
                        let rep = result.data;
                        console.log("This is rep: "+rep);
                        if (rep === "SUCCESS"){
                            navigation.navigate('Login')}
                        else if (rep === "DNE"){
                            Alert.alert("That Username and/or email is not correct");
                            navigation.navigate('Sign Up');
                        }
                        else if (rep === "BADPW"){
                            Alert.alert("That Username and/or email is not correct");}
                        else{
                            Alert.alert("An error occured "+result.data);
                            navigation.navigate('Sign Up');
                    }});
                    onLoginPress()}}
            />


            <TouchableOpacity style={styles.googleButtonContainer} onPress={accessToken ? getUserData : () => { promptAsync() }}>
                <Image
                    style={styles.googleButtonImage}
                    source={require("../assets/btn_google_signin_dark_normal_web2x.png")}
                />
            </TouchableOpacity>

            </View>
        </View>
    );

   /*  onbeforeunload(This is where we need to send the information (cookies) somewhere
   we will send each individual button clicks
    */
}

//*** Regextest
const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email Address is Required'),
    password: yup
        .string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
})

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
        //fontSize: 32,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
        width: '90%'
        //backgroundColor: "#000000c0"
    },
    photoboomText: {
        flex: 1,
        width: '70%',
        height: '25%',
    },

    profilePic: {
        width: 50,
        height: 50
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
    },
    userInfo: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default LoginScreen;
