import {ImageBackground, Image, StyleSheet, View, TextInput, TouchableOpacity, Text, Button, Alert} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";




const SignUpScreen = (navigation) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] =  useState('');

    const onSignInPress = () => {
        Alert.alert('Sign Up Press', "You pressed the sign me up button")
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
                            onSignInPress()
                        }
                    }}
                />
            </View>

            {/*            <TouchableOpacity onPress={()=>{clickCounter("ForgotPW"),navigation.navigate('Forgot')}}>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>*/}

{/*            <TouchableOpacity onPress={()=>{incrementForgotCounter(), navigation.navigate('Forgot')}}>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>*/}

{/*            {showUserInfo()}
            <Text>This is how many times you've forgotten your password: {forgotCounter}</Text>
            <Text>This is how many times the login button has been clicked {loginCounter}</Text>*/}
            {/*            <div>
                <Text>This is how many times you've forgotten your password {localStorage.getItem("ForgotPW")}</Text>
                <br></br>
                <Text>This is how many times the login button has been clicked {localStorage.getItem("Login")}</Text>
            </div>*/}

            {/*           <TouchableOpacity   style={styles.loginBtn}  >
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>*/}
            {/*            <TouchableOpacity onPress={()=>{clickCounter("Login"),onLoginPress()}}>
                <Text>Login</Text>
            </TouchableOpacity>*/}
            <Button
                title="Sign Up"
                color="red"
                /*onPress={()=>{TODO}*/
            />


{/*            <TouchableOpacity style={styles.googleButtonContainer} >
                <Image
                    //resizeMode={"contain"}
                    style={styles.googleButtonImage}
                    source={require("../assets/btn_google_signin_dark_normal_web2x.png")}
                />
            </TouchableOpacity>*/}


        </View>
    );
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