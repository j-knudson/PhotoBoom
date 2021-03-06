import React, {useState} from 'react';
import { StatusBar} from "expo-status-bar";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image, Button, ActivityIndicator, Platform,
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
import stringifySafe from "react-native/Libraries/Utilities/stringifySafe";

import {
    BackgroundContainer_withHeader,
    StyledContainer,
    InnerContainer,
    Line,
    LoginContainer,
    MsgBox,
    PhotoBoomLogo,
    PhotoBoomText,
    RightIcon,
    StyledFormArea,
    StyledInputArea,
    StyledInputLabel,
    SubmitButton,
    TextButton,
    TextError,
    TextInputArea, GoogleButtonContainer, GoogleSignIn,
} from "../components/styledcontainers";
import {Colors} from "../components/Colors";

//keyboard avoiding view
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

WebBrowser.maybeCompleteAuthSession();

let serverAddress = '35.184.204.201';

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

    const cookies = async (cookieName) => {
        await AsyncStorage.getItem(cookieName).then(function(result){
            console.log("This is result in cookies function " + result);
            if (result === null) AsyncStorage.setItem(cookieName, stringifySafe(1));
            else {
                const newRes = Number(result) + 1;
                AsyncStorage.setItem(cookieName, stringifySafe(newRes));
            }
        })
    }

    const cookiesToDb = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const result = await AsyncStorage.multiGet(keys);
            const map1 = result.map(element => element = {name: element[0], value: element[1]});
            console.log(map1);
            const res = axios.put('http://'+serverAddress+':3000/cookies', {user: email, cArray: map1});

        } catch (error) {
            console.error(error)
        }
    }
    // </Cookies> -------------------------------------------------------------------------------------------------

const [hidePassword, setHidePassword] = useState(true);

        const loginHandler  = (values) => {

            console.log(values)

            const res = axios.post('http://'+serverAddress+':3000/users',{email: values.email, password: values.password}).then(function(result){
                let rep = result.data;
                console.log("This is rep: "+rep);
                if (rep === "SUCCESS"){
                    setUserInfo(values)
                    navigation.navigate('Landing', {
                        loginData: values
                    })}
                else if (rep === "DNE"){
                    Alert.alert("That Username and/or password is not correct");
                    navigation.navigate('Sign Up');
                }
                else if (rep === "BADPW"){
                    Alert.alert("That Username and/or password is not correct");}
                else{
                    Alert.alert("An error occured "+result.data);
                    navigation.navigate('Sign Up');
                }});

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

    return (
        <StyledContainer>
            <StatusBar style="auto" />
            <InnerContainer>
                <PhotoBoomText source={require('../assets/photo_boom_text.png')}/>
            </InnerContainer>

            <InnerContainer>
                <PhotoBoomLogo source={require('../assets/photoboom_logo.png')}/>
            </InnerContainer>
            {Platform.OS !=='web' &&
                <KeyboardAvoidingWrapper>
                <LoginContainer>
                        <Formik
                            validationSchema={loginValidationSchema}
                            initialValues={{email: '', password: ''}}
                            onSubmit={(values, { setSubmitting }) => {
                                cookies('@loginCount');
                                loginHandler(values);
                                setSubmitting(false);
                            }}
                        >
                                {({
                                  handleChange,
                                  handleBlur,
                                  handleSubmit,
                                  values,
                                  errors,
                                  isValid,
                                  touched,
                                  isSubmitting,
                                }) => (
                                <>
                                    <MyTextInput
                                        label="Email Address"
                                        icon = "mail"
                                        name="email"
                                        placeholder="Email Address"
                                        placeholderTextColor="gray"
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        keyboardType="email-address"
                                    />
                                    <MyTextInput
                                        label="Password"
                                        icon="lock"
                                        name="password"
                                        placeholder="* * * * * "
                                        placeholderTextColor="gray"
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        secureTextEntry={hidePassword}
                                        isPassword={true}
                                        hidePassword={hidePassword}
                                        setHidePassword={{setHidePassword}}
                                    />
                                    <MsgBox>
                                        {errors.email && touched.email &&
                                            <TextError>{errors.email}</TextError>
                                        }
                                        {errors.password && touched.password &&
                                            <TextError>{errors.password}</TextError>
                                        }
                                    </MsgBox>

                                    <SubmitButton onPress={handleSubmit}>
                                        {isSubmitting &&
                                            <ActivityIndicator size="large" color={Colors.primaryGreen} />
                                        }
                                        {!isSubmitting &&
                                            <TextButton>Login </TextButton>
                                        }
                                    </SubmitButton>
                                </>
                                )}
                        </Formik>
                </LoginContainer>
                </KeyboardAvoidingWrapper>
            }
            {Platform.OS ==='web' &&
                <LoginContainer>
                    <Formik
                        validationSchema={loginValidationSchema}
                        initialValues={{email: '', password: ''}}
                        /*onSubmit={values => loginHandler(values)}*/
                        onSubmit={(values, { setSubmitting }) => {
                            cookies('@loginCount');
                            loginHandler(values);
                            setSubmitting(false);
                        }}
                    >
                        {({
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              values,
                              errors,
                              isValid,
                              touched,
                              isSubmitting,
                          }) => (
                            <>
                                <MyTextInput
                                    label="Email Address"
                                    icon = "mail"
                                    name="email"
                                    placeholder="Email Address"
                                    placeholderTextColor="gray"
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                <MyTextInput
                                    label="Password"
                                    icon="lock"
                                    name="password"
                                    placeholder="* * * * * "
                                    placeholderTextColor="gray"
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={{setHidePassword}}
                                />
                                <MsgBox>
                                    {errors.email && touched.email &&
                                        <TextError>{errors.email}</TextError>
                                    }
                                    {errors.password && touched.password &&
                                        <TextError>{errors.password}</TextError>
                                    }
                                </MsgBox>

                                <SubmitButton onPress={handleSubmit}>
                                    {isSubmitting &&
                                        <ActivityIndicator size="large" color={Colors.primaryGreen} />
                                    }
                                    {!isSubmitting &&
                                        <TextButton>Login </TextButton>
                                    }
                                </SubmitButton>
                            </>
                        )}
                    </Formik>
                </LoginContainer>
            }
            <View style={customStyle.innerContainer}>


            <TouchableOpacity onPress={()=>{cookies('@forgotCount'), navigation.navigate('Forgot')}}>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>

            {showUserInfo()}
            <Button
                title="Logout"
                color="blue"
                onPress = {()=>{cookiesToDb();}}/>
            <Button
                title="Login"
                color="red"
                onPress={()=>{
                    cookies('@loginCount');
                    console.log("Login button clicked");
                    /*incrementLoginCounter();*/
                    const res = axios.post('http://'+serverAddress+':3000/users',{email: email, password: password}).then(function(result){
                        let rep = result.data;
                        console.log("This is rep: "+rep);
                        if (rep === "SUCCESS"){
                            navigation.navigate('Login')}
                        else if (rep === "DNE"){
                            Alert.alert("That Username and/or password is not correct");
                            navigation.navigate('Sign Up');
                        }
                        else if (rep === "BADPW"){
                            Alert.alert("That Username and/or password is not correct");}
                        else{
                            Alert.alert("An error occured "+result.data);
                            navigation.navigate('Sign Up');
                    }});
                    onLoginPress()}}
            />


               <GoogleButtonContainer onPress={accessToken ? getUserData : () => { promptAsync() }}>
                    <GoogleSignIn source={require('../assets/btn_google_signin_dark_normal_web2x.png')}/>
                </GoogleButtonContainer>
            </View>
        </StyledContainer>
    );

/*   window.onbeforeunload = (event) => {
       console.log("In beforeunload");
       const cookieArray = importData();
       cookieArray.forEach(function(cookie){axios.put('http://10.0.2.2:3000/cookies', {user: email, cName: cookie.name, cValue: cookie.value})})
   }*/

/*    React.useEffect(() => {
        React.AppState.addEventListener('change', handleAppStateChange);

        return () => {
            React.AppState.removeEventListener('change', handleAppStateChange);
        };
    }, []);

    const handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'inactive') {
            console.log('the app is closed');
        }
    }*/

}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
        <View style={{width: "75%", flex: 2}}>
            <StyledInputLabel> {label} </StyledInputLabel>
            <StyledInputArea>
                <Octicons name={icon} size={25} color={Colors.iconColors}/>
                <TextInputArea {...props} />
                {isPassword && (
                    <RightIcon onPress={()=> {setHidePassword.setHidePassword(!hidePassword)}}>
                        <Octicons  name={hidePassword ? 'eye' : 'eye-closed'} size={25} color={Colors.iconColors}/>
                    </RightIcon>
                )}
                {!isPassword && (
                    <View>
                        <Octicons  name="thumbsup" size={25} color={Colors.inputBackground}/>
                    </View>
                )}
            </StyledInputArea>
        </View>
    );
};



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
        width: '50%',
        height: '50%',
        resizeMode: 'contain',
        //backgroundColor: 'gray'
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
        //backgroundColor: "purple"
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
