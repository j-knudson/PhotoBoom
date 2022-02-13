import React, {useState} from 'react';
import {Text} from "react-native-web";
import {Alert, Button} from "react-native";


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] =  useState('');
    const onLoginPress = () => {
        //TO DO
        navigation.navigate('Landing')
    }

    return (
        <Button
            title="Log in 2"
            onPress={() => navigation.navigate('Landing')}
        />
    );
}

export default LoginScreen;