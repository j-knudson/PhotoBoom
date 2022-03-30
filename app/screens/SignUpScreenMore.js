
import {Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import SignUpStyles from "../components/SignupStyles";
import {StatusBar} from "expo-status-bar";
import * as yup from "yup";
import {Octicons} from "@expo/vector-icons";
import {Formik} from "formik";


const SignUpScreenMore = ( navigation) => {
    const [hidePassword, setHidePassword] = useState(true);

/*    const PasswordVisibility = () => {
        console.log(hidePassword);
        setHidePassword(!hidePassword);
    }*/
    return (
        <View style={SignUpStyles.container}>
            <StatusBar style="auto" />
            <View style={SignUpStyles.innerContainer}>

                <Image
                    resizeMode={"contain"}
                    style={SignUpStyles.photoboomText}
                    source={require("../assets/photo_boom_text.png")}
                />
            </View>
            <View style={SignUpStyles.innerContainer}>
                <Image
                    resizeMode={"contain"}
                    style={SignUpStyles.photoboomLogo}
                    source={require("../assets/photoboom_logo.png")}
                />
            </View>
            <View style={SignUpStyles.loginContainer}>
                <Formik
                        validationSchema={SignUpValidationSchema}
                        initialValues={{firstName: '', last: '', dateOfBirth: ''}}
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
                            <MyTextInput
                                label="First Name"
                                icon = "person"
                                name="firstName"
                                placeholder="Joe"
                                placeholderTextColor="gray"
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                                value={values.firstName}
                                //keyboardType="email-address"
                            />
                            <MyTextInput
                                label="Last Name"
                                icon = "person"
                                name="lastName"
                                placeholder="Sixpack"
                                placeholderTextColor="gray"
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                                value={values.lastName}
                            />
                            <MyTextInput
                                label="Date of Birth"
                                icon = "calendar"
                                name="dateOfBirth"
                                placeholder="YYYY - MM - DD"
                                placeholderTextColor="gray"
                                onChangeText={handleChange('dateOfBirth')}
                                onBlur={handleBlur('dateOfBirth')}
                                value={values.dateOfBirth}
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

                            <TouchableOpacity style={SignUpStyles.StyledButton} onPress={()=> handleSubmit}>
                                <Text style={SignUpStyles.text}> Submit </Text>
                            </TouchableOpacity>
                            </>
                        )}
                    </Formik>

            </View>
        </View>
    );
}
const SignUpValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email Address is Required'),
    password: yup
        .string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
})


const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword,...props}) => {
    const PasswordVisibility = () => {
        console.log(hidePassword);
        setHidePassword(!hidePassword);
    }
    return (
        <View style={SignUpStyles.StyledContainer}>
            <Text style={SignUpStyles.InputLabel}>{label}:</Text>
            <View style={SignUpStyles.TextInputArea2}>
                <View style={SignUpStyles.leftIcon}>
                    <Octicons name={icon} size={25} color="red"/>
                </View>
                <TextInput
                    style={SignUpStyles.text}
                    {...props}
                />
                {/*blank area so content lines up correctly with password area below*/}
                <View style={SignUpStyles.rightIcon}>
                    {isPassword && (
                        <TouchableOpacity onPress={()=> {setHidePassword.setHidePassword(!hidePassword)}}>
                        {/*<TouchableOpacity onPress={PasswordVisibility}>*/}
                            <Octicons  name={hidePassword ? 'eye' : 'eye-closed'} size={25} color="red"/>
                        </TouchableOpacity>
                    )}

                </View>

            </View>
        </View>

    );
};



export default SignUpScreenMore;
