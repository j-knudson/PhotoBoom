import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Constants from 'expo-constants';
import styled from 'styled-components';

const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
    primaryBlue: '#0000ff',
    primaryGreen: '#008000',
    primaryRed: '#ff0000',
    darkLight: '#9CA3AF',
    white: '#ffffff',
}

const {primaryBlue, primaryGreen, primaryRed, darkLight, white} = Colors;

const SignUpStyles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: "whitesmoke",
        alignItems: "center",
        justifyContent: "center",
    },
    errorMessageBox: {
        textAlign: "center",
    },
    innerContainer: {
        flex: 1,
        width: "70%",
        alignItems: "center",
        margin: 5,
    },
    InputLabel: {
        alignSelf: "flex-start",
        color: "black",
        fontSize: 20,
        paddingLeft: 10,
    },
    leftIcon: {
        left: 15,
        alignItems: 'center',
        zIndex: 1,
    },
    loginContainer: {
        flex: 2,
        width: "100%",
        alignItems: "center",
        //backgroundColor: "red",
    },
    photoboomLogo: {
        flex: 1,
        width: '30%',
        height: '30%',
        resizeMode: 'contain'
    },
    photoboomText: {
        flex: 1,
        width: '70%',
        height: '25%',
    },
    rightIcon: {
        right: 15,
        alignItems: "center",
        zIndex: 1,
    },
    StyledButton: {
        flex: .5,
        backgroundColor: "red",
        fontWeight: "bold",
        textAlign: "center",
        width: "75%",
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        justifyContent: "center",
    },
    StyledContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "75%",
        flex: 1,
    },
    text: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
        width: '70%',
    },
    textCalendar: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
        width: '100%',
    },

    TextInputArea: {
        flex: 1,
        flexShrink: 0,
        /*height: 60,*/
        backgroundColor: "blue",
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "space-between",
        width: "100%",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },

///*********Matching styled inputs
    StyledTextInput: {
        backgroundColor: primaryBlue,
        padding: 15,
        paddingLeft: 55,
        borderRadius: 5,
        height: 60,
        marginVertical: 3,
        marginBottom: 10,
        color: white,
        width: "100%",
        flexDirection: "row",
        textAlign: "center",
        justifyContent: "space-between",
        alignItems: "center",

        /*        fontWeight: "bold",

                marginBottom: 20,*/
    },
    StyledInputLabel: {
        color: primaryGreen,
        fontSize: 13,
        textAlign: 'left',
    }
})


export default SignUpStyles;