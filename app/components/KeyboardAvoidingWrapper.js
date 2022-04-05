import react from 'react';

//keyboard avoiding view;
import {KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard} from "react-native";
import {Platform} from "react-native";
import {LoginContainer} from "./styledcontainers";


const KeyboardAvoidingWrapper = ({children}) => {
    if (Platform.OS === 'web') {
        console.log("keyboardwrapper: web")
        return (null);
    }
    else if(Platform.OS !== "web") {
        console.log("keyboardwrapper: not web")
        return (
            <KeyboardAvoidingView style={{flex: 1}}>
                <ScrollView>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        {children}
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}


export default KeyboardAvoidingWrapper;