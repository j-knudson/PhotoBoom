import {
    ImageBackground,
    Image,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Button,
    Alert,
    Platform
} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";
import axios from "axios";
import customStyle from "../components/styles";
import {Formik} from "formik";
import {Octicons} from "@expo/vector-icons";
import * as yup from "yup";



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
    TextInputArea,
} from "../components/styledcontainers";
import {Colors} from "../components/Colors";



/*const bcrypt = require('bcrypt');*/


const SignUpScreen = ({navigation}) => {


    const [email, setEmail] = useState('');
    const [password, setPassword] =  useState('');

    const onSignInPress = values => {
        Alert.alert('Sign Up Press', "You pressed the sign me up button")
        console.log(values)
        navigation.navigate('SignUpMore', {
            u_email: values.email,
        });
    }
/*    navigation.navigate('Landing', {
        itemID : email,
        newEmail: password,
        testString: 'This is my test message',
    });*/

    ///********************ORIGINAL WORKING ******************************


    ////*****************************NEW SIGN UP  *******************************
    const [hidePassword, setHidePassword] = useState(true);

    //*** Regextest
    const loginValidationSchema = yup.object().shape({
        /*email: yup
            .string()
            .email("Please enter valid email")
            .required('Email Address is Required'),
        password: yup
            .string()
            .min(8, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required'),
        confirm_password: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Your passwords do not match')
            .required('Confirm password is required'),*/
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

            <LoginContainer>
                    <Formik
                        validationSchema={loginValidationSchema}
                        initialValues={{email: '', password: '', confirm_password: ''}}
                        //onSubmit={values => console.log(values)}
                        onSubmit={onSignInPress}
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

                                <MyTextInput
                                    label="Re-enter Password"
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
                                    {errors.firstName &&
                                        <TextError>{errors.firstName}</TextError>
                                    }
                                    {errors.lastName &&
                                        <TextError>{errors.lastName}</TextError>
                                    }
                                </MsgBox>

                                <SubmitButton onPress={handleSubmit}>
                                    <TextButton>Submit Registration </TextButton>
                                </SubmitButton>
                                <Line />
                            </>
                        )}
                    </Formik>
            </LoginContainer>
        </StyledContainer>
    );
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
/*        fontSize: 32,*/
        //lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
        width: '90%',
        height: '100%',
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
    },
    userInfo: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default SignUpScreen;


