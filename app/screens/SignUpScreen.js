import {
    View,
    Alert,
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
            u_password: values.password
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
        email: yup
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
            .required('Confirm password is required'),
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
                                    name="confirm_password"
                                    placeholder="* * * * * "
                                    placeholderTextColor="gray"
                                    onChangeText={handleChange('confirm_password')}
                                    onBlur={handleBlur('confirm_password')}
                                    value={values.confirm_password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={{setHidePassword}}
                                />

                                <MsgBox>
                                    {errors.email &&
                                        <TextError>{errors.email}</TextError>
                                    }
                                    {errors.password &&
                                        <TextError>{errors.password}</TextError>
                                    }
                                    {errors.confirm_password &&
                                        <TextError>{errors.confirm_password}</TextError>
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

export default SignUpScreen;


