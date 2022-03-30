import {ImageBackground, Image, StyleSheet, View, TextInput, TouchableOpacity, Text, Button, Alert} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";
import axios from "axios";
import customStyle from "../components/styles";
import {Formik} from "formik";
import {Octicons} from "@expo/vector-icons";
import * as yup from "yup";
import SignUpScreenMore from "./SignUpScreenMore";


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
/*    return (
        <View style={styles.container}>
            <Image
                resizeMode = {"contain"}
                style={styles.photoboomText}
                source={require("../assets/photo_boom_text.png")}
            />
            <Image
                resizeMode = {"contain"}
                style={styles.image2}
                source={require("../assets/photoboom_logo.png")}
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
                            onSignInPress()
                        }
                    }}
                />
            </View>

            <Button
                title="Sign Up"
                color="red"
                onPress={async function (){
                    console.log("email is "+email+"   Password is "+password);
                  /!*  bcrypt.hash(password,8,function(err,hash){
                        if (err) console.log("err is " + err);
                        else console.log("hash is " + hash);
                    })*!/
                    const res = await axios.put('http://10.0.2.2:3000/users',{email: email, password: password}).then(function(result){
                        let rep = result.data;
                        console.log("This is rep: "+rep);
                    if (rep === "SUCCESS"){
                        navigation.navigate('Login')}
                    else if (rep === "DUPEMAIL"){
                        Alert.alert("That Email already exists");
                        navigation.navigate('Sign Up');
                    }
                    else{
                        Alert.alert("An error occured "+result.data);
                        navigation.navigate('Sign Up');
                    }});
                }}
            />



        </View>
    );*/

    ////*****************************NEW SIGN UP  *******************************
    const [hidePassword, setHidePassword] = useState(true);

    //*** Regextest
    const loginValidationSchema = yup.object().shape({
/*        email: yup
            .string()
            .email("Please enter valid email")
            .required('Email Address is Required'),
        password: yup
            .string()
            .min(8, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required'),*/
    })


    return (
        <View style={styles.container}>
            <View style={customStyle.innerContainer}>
                <Image
                    resizeMode={"contain"}
                    style={styles.photoboomText}
                    source={require("../assets/photo_boom_text.png")}
                />
            </View>
            <View style={customStyle.innerContainer}>
                <Image
                    resizeMode={"contain"}
                    style={styles.image2}
                    source={require("../assets/photoboom_logo.png")}
                />
            </View>

            <View style={customStyle.innerContainer}>

                <StatusBar style="auto" />


                <View style={customStyle.loginContainer}>
                    <Formik
                        validationSchema={loginValidationSchema}
                        initialValues={{email: '', password: ''}}
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
{/*                                <MyTextInput
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
                                />*/}
                                <View style={customStyle.TextInputArea}>
                                    <View style={customStyle.leftIcon}>
                                        <Octicons name="mail" size={20} color="red"/>
                                    </View>
                                    <TextInput
                                        style={customStyle.text}
                                        name="email"
                                        placeholder="Email Address"
                                        placeholderTextColor="gray"
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        keyboardType="email-address"
                                    />
                                    {/*blank area so content lines up correctly with password area below*/}
                                    <View style={customStyle.rightIcon}/>
                                </View>
                                <View style={customStyle.TextInputArea}>
                                    <View style={customStyle.leftIcon}>
                                        <Octicons name="lock" size={20} color="red"/>
                                    </View>
                                    <TextInput
                                        name="password"
                                        placeholder="Password"
                                        placeholderTextColor="gray"
                                        style={customStyle.text}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        secureTextEntry={hidePassword}
                                    />
                                    <View style={customStyle.rightIcon}>
                                        <Octicons onPress={() => setHidePassword(!hidePassword)} name={hidePassword ? 'eye' : 'eye-closed'} size={20} color="red"/>
                                    </View>
                                </View>
                                <View style={customStyle.TextInputArea}>
                                    <View style={customStyle.leftIcon}>
                                        <Octicons name="lock" size={20} color="red"/>
                                    </View>
                                    <TextInput
                                        name="password"
                                        placeholder="Confirm Password"
                                        placeholderTextColor="gray"
                                        style={customStyle.text}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        secureTextEntry={hidePassword}
                                    />
                                    <View style={customStyle.rightIcon}>
                                        <Octicons onPress={() => setHidePassword(!hidePassword)} name={hidePassword ? 'eye' : 'eye-closed'} size={20} color="red"/>
                                    </View>
                                </View>
                                <View style={customStyle.errorMessageBox}>
                                    {errors.email &&
                                        <Text style={customStyle.errorText}>{errors.email}</Text>
                                    }
                                    {errors.password &&
                                        <Text style={customStyle.errorText}>{errors.password}</Text>
                                    }
                                </View>
                                <TouchableOpacity style={customStyle.StyledButton} onPress={ handleSubmit}>
                                    <Text style={customStyle.text}> Continue </Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </Formik>
                    <View style={customStyle.innerContainer}></View>
                </View>
            </View>
        </View>
    );
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (

/*            <View style={customStyle.TextInputArea}>
                <View style={customStyle.leftIcon}>
                    <Octicons name={icon} size={25} color="red"/>
                </View>
                <Text style={customStyle.TextInput2}>{label}</Text>
                <TextInput
                    style={customStyle.text}
                    {...props}
                />
                {/!*blank area so content lines up correctly with password area below*!/}
                <View style={customStyle.rightIcon}/>

            </View>*/
    <View style={customStyle.StyledContainer}>
        <Text style={customStyle.TextInput2}>{label}:</Text>
        <View style={customStyle.TextInputArea2}>
            <View style={customStyle.leftIcon}>
                <Octicons name={icon} size={25} color="red"/>
            </View>
            <TextInput
                style={customStyle.text}
                {...props}
            />
            {/*blank area so content lines up correctly with password area below*/}
            <View style={customStyle.rightIcon}>
                {isPassword && (
                <TouchableOpacity onPress={()=> {setHidePassword.setHidePassword(!hidePassword)}}>
                    <Octicons  name={hidePassword ? 'eye' : 'eye-closed'} size={25} color="red"/>
                </TouchableOpacity>
                )}

            </View>

        </View>
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
