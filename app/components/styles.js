import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Constants from 'expo-constants';
import styled from 'styled-components';

const StatusBarHeight = Constants.statusBarHeight;


//colors
export const Colors = {
    primaryRed: '#ff0000',
    primaryGreen: '#008000',
    primaryBlue: '#0000ff',
    darkLight: '#9CA3AF',

    brand: "#6D28D9",
    primary: '#ffffff',
    secondary: '#E5e7eb',
    smoke: '#f5f5f5',
    white: '#ffffff',
 }

const {primaryBlue, primaryGreen, primaryRed, darkLight, white} = Colors;

/*export const StyledContainer = styled.View `
    flex: 1; 
    padding: 25px; 
    background-color: ${smoke}; 
`;

export const InnerContainer = styled.View`
    flex: 1; 
    width: 100%; 
    align-items: center; 
`;

export const PageLogo = styled.Image`
    width: 250px; 
    height: 200px;
`;

export const PageLogo = styled.Image`
    width: '70%'; 
    height: '25%;
`;


export const PageTitle = styled.Text`
    font-size: 30px; 
    text-align: center; 
    font-weight: bold; 
    color ${brand}; 
    padding: 10px; 
`;

export const Subtitle = styled.Text`
  font-size: 18px; 
  margin-bottom: 20px; 
  letter-spacing: 1px; 
  font-weight: bold; 
  color: ${white};  
`;

export const StyledFormArea = styled.View`
    width: 90%;
`;

export const StyledTextInput = styled.TextInput `
    background-color: ${primaryBlue};
    padding: 15px; 
    padding-left: 55px; 
    border-radius: 5px; 
    font-size: 16px;
    height: 60px; 
    margin-vertical: 3px; 
    margin-bottom: 10px; 
    color: ${white}; 
`;

export const StyledInputLabel = styled.Text`
    color: ${primaryBlue};
    font-size: 13px; 
    text-align: left; 
`;

export const LeftIcon = styled.View`
    left: 15px; 
    top: 38px; 
    position: absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    left: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 15px; 
    background-color: ${smoke};
    justify-content: center;
    margin-vertical: 5px; 
    height: 60px; 
`;

export const ButtonText = styled.Text`
    color: ${primaryRed};
    font-size: 16px; 
`;*/


export const customStyle = StyleSheet.create({
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
        alignSelf: "center",
    },
    googleButtonContainer: {
        flex: 1,
        width: '100%',
        height: '50%',
        alignItems: 'center',
        resizeMode: 'contain',
        //backgroundColor: "black",
    },
    googleButtonImage: {
        //flex: 1,
        width: '100%',
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
        //fontSize: 32,
        //lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
        width: '70%',
        },
    photoboomLogo: {
        width: '100%',
        height: '100%',
        resizeMode: "contain",
    },
    photoboomText: {
        flex: 1,
        width: '100%',
        height: '100%',
    },

    profilePic: {
        width: 50,
        height: 50
    },


    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    TextInput2: {
        alignSelf: "flex-start",
        color: "black",
        fontSize: 20,
        paddingLeft: 10,
/*        position: "absolute",
        paddingBottom: 80,*/
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

    innerContainer: {
        //resizeMode: "cover",
        flex: 1,
        width: "70%",
        alignItems: "center",
        margin: 5,
        //backgroundColor: "dodgerblue"
    },

    StyledContainer: {
        //backgroundColor: "purple",
        alignItems: "center",
        justifyContent: "center",
        width: "70%",
        //height: "20%",
        flex: 1,
    },
    TextInputArea: {
        flex: 1,
        backgroundColor: "blue",
        //color: "white",
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "space-between",
        width: "75%",
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        //padding: "5%",
        position: "relative"
    },
    TextInputArea2: {
        flex: 1,
        backgroundColor: "blue",
        //color: "white",
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "space-between",
        width: "100%",
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    leftIcon: {
      //alignSelf: "flex-start",
      //justifyContent: "center",

        //paddingLeft: "5%"
        left: 15,
        //top: 10,
        //position: "absolute",
        alignItems: 'center',
        zIndex: 1,
    },
    loginButtonContainer: {
        flex: 1,
        width: '100%',
        height: '50%',
        alignItems: 'center',
        backgroundColor: "whitesmoke",
        margin: 10,
    },
    loginContainer: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        //backgroundColor: "red",
    },
    StyledInputLabel: {
        color: "blue",
        textAlign: "left",
    },
    rightIcon: {
        //paddingRight: "5%",
        right: 15,
        alignItems: "center",
        zIndex: 1,
    },
    StyledButton: {
        flex: 1,
        backgroundColor: "red",
        //color: "white",
        fontWeight: "bold",
        textAlign: "center",
        width: "75%",
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        justifyContent: "center",
    },
    errorMessageBox: {
        textAlign: "center",
    },
    errorText: {
        color: 'red',
        fontStyle: 'italic',
    }
});

export default customStyle;

/*
export const StyledFormArea = styled.View`
    width: 90%;
`;
/*
export const StyledInputLabel = styled.Text`
    color: "red";
    font-size: 13px; 
    text-align: left; 
`;

export const LeftIcon = styled.View`
    left: 15px; 
    top: 38px; 
    position: absolute;
    z-index: 1;
`;*/

