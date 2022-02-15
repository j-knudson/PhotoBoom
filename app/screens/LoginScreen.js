import React, {useState} from 'react';
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

function onSignIn(googleUser){
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getID());
    console.log('Name: '+profile.getName());
    console.log('Image URL: '+profile.getImageURL());
}
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
    return (
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
            <View style={styles.loginEmailButton}>
                <div class="g-signin2" data-onsuccess="onSignIn"></div>
            </View>
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
                            navigation.navigate("Landing")
                        }
                    }}
                />
            </View>
            <TouchableOpacity onPress={()=> navigation.navigate('Forgot')}>
                <Text style={styles.forgotText}> Forgot Clearance Code?</Text>
            </TouchableOpacity>
        </ImageBackground>
        <script src="https://apis.google.com/js/platform.js" async defer></script>
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

});

export default LoginScreen;
