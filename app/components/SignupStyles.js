import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Constants from 'expo-constants';
import styled from 'styled-components';

const StatusBarHeight = Constants.statusBarHeight;



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
        backgroundColor: "blue",
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "space-between",
        width: "100%",
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
})


export default SignUpStyles;