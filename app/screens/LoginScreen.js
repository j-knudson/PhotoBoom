import React, {useState} from 'react';
import { StatusBar} from "expo-status-bar";
import {
    Alert,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';

/*function onSignIn(googleUser){
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getID());
    console.log('Name: '+profile.getName());
    console.log('Image URL: '+profile.getImageURL());
    console.log('Email: '+profile.getEmail());
}*/
const LoginScreen = ({navigation}) => {

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
 /*   return (
        <ImageBackground
            resizeMode={"contain"}
            style={styles.background}
            source={require('../assets/rebel_empire.jpg')}
        >
            <View style={styles.container}>
                <TouchableOpacity onPress={()=> onLoginPress()}>
                    <Image style={{width: 50, height: 50}} source={require('../assets/crossed_sabers.jpg')} />
                </TouchableOpacity>
            </View>
            {/!*<View style={styles.loginEmailButton}>
                <div class="g-signin2" data-onsuccess="onSignIn"></div>
            </View>*!/}
            <View style={styles.loginEmailButton}>
                <TextInput
                    style={styles.text}
                    placeholder ="Imperial Email"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>
            <View style={styles.loginPasswordButton}>
                <TextInput
                    style={styles.text}
                    placeholder ="Code Clearance"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                    onKeyPress = {event =>  {
                        if (event.key === 'Enter') {
                            navigation.navigate('Landing', {
                                itemID : email,
                                newEmail: password,
                                testString: 'This is my test message'
                            })
                        }
                    }}
                />
            </View>
            <TouchableOpacity onPress={()=> navigation.navigate('Forgot')}>
                <Text style={styles.forgotText}> Forgot Clearance Code?</Text>
            </TouchableOpacity>
        </ImageBackground>
 /!*       <script src="https://apis.google.com/js/platform.js" async defer></script>*!/
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        justifyContent: "flex-end",
        alignItems: "center",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'blue',
        position: "absolute",
        top: 50,
    },
    forgotPassword: {
        width: '100%',
        height: 70,
        backgroundColor: 'black',
    },
    forgotText: {
        color: "white",
        textAlign: "center",
        justifyContent: "center",
        fontSize: 22
    },
    loginButton: {
        alignContent: "center",
        position: "absolute",
        top: 50,

    },
    loginEmailButton: {
        width: '100%',
        height: 70,
        backgroundColor: 'red',
    },
    loginPasswordButton: {
        width: '100%',
        height: 70,
        backgroundColor: 'limegreen',
    },
    logo: {
        resizeMode: "contain",
        width: '25%',
        height: '25%',
        //position: 'absolute',
        //top: 50,
    },
    text: {
        color: "white",
        fontSize: 32,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
        backgroundColor: "#000000c0"
    }

});*/
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

            <TouchableOpacity onPress={()=> navigation.navigate('Forgot')}>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity   style={styles.loginBtn}  >
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
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

    image2: {
        flex: 2,
        width: '50%',
        height: '50%',
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
