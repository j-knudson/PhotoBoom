import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Constants from 'expo-constants';
import styled from 'styled-components/native';

const StatusBarHeight = Constants.statusBarHeight;

import {Colors} from "../components/Colors"




export const InnerContainer = styled.View`
    flex: 1; 
    width: 100%; 
    align-items: center; 
`;

export const PhotoboomLogo = styled.Image`
    flex: 1;
    width: 50%;
    height: 50%;
    resize-mode: contain;
`;

export const StyledContainer = styled.View `
    flex: 1; 
    background-color: ${Colors.customBackground}; 
    align-items: center;
    justify-content: center;
    padding-bottom: 10%;
`;


//*********************************//


export const PageLogo = styled.Image`
    width: 250px; 
    height: 200px;
`;


export const PageTitle = styled.Text`
    font-size: 30px; 
    text-align: center; 
    font-weight: bold; 
    color ${Colors.primaryRed}; 
    padding: 10px; 
`;

export const Subtitle = styled.Text`
  font-size: 18px; 
  margin-bottom: 20px; 
  letter-spacing: 1px; 
  font-weight: bold; 
  color: ${Colors.textColor};  
`;

export const StyledFormArea = styled.View`
    height: 100%; 
    width: 100%;
    background-color: ${Colors.primaryGreen}
`;

export const StyledTextInput = styled.TextInput `
    background-color: ${Colors.primaryBlue};
    padding: 15px; 
    padding-left: 55px; 
    border-radius: 5px; 
    font-size: 16px;
    height: 60;
    margin-vertical: 3px; 
    margin-bottom: 10px; 
    color: ${Colors.textColor}; 
    text-align: center; 
`;

export const StyledTextInput2 = styled.TextInput `
    background-color: ${Colors.testPurple};
    color: ${Colors.textColor}; 
    font-weight: bold;
    align-content: center;
    width: 100%;
    height: 100%;
    justify-content: center; 
    text-align: center;
    flex: 1;
    
`;

export const StyledTextInput3 = styled.TextInput `
    background-color: ${Colors.primaryRed};
    color: ${Colors.primaryGreen}; 
    font-weight: bold;
    align-content: center;
    width: 90%;
    height: 90%;
    justify-content: center; 
    text-align: center;
    flex: 1;
`;


export const StyledInputLabel = styled.Text`
    color: ${Colors.primaryBlue};
    font-size: 13px; 
    text-align: left; 
`;

export const LeftIcon = styled.View`
    padding-left: 15px; 
    z-index: 1;
    background-color: ${Colors.testPurple}
    
`;

export const LeftIcon2 = styled.View`
    width: 100%
    background-color: ${Colors.primaryBlue}
    flex: 2;
    flex-direction: row; 
    align-items: center;
    padding-left: 5%; 
    padding-right: 5%;
    border-radius: 10px; 
    justify-content: space-around; 
`;


export const RightIcon = styled.TouchableOpacity`
    z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 15px; 
    background-color: ${Colors.submitButtons};
    justify-content: center;
    margin-vertical: 5px; 
    height: 60px; 
    border-radius: 10px; 
    width: 70%;
`;

export const StyledButton2 = styled.TouchableOpacity`
    padding: 15px; 
    background-color: ${Colors.submitButtons};
    justify-content: center;
    margin-vertical: 5px; 
    flex: .5;
    border-radius: 5px; 
    width: 70%;
    text-align: center; 
`;

export const ButtonText = styled.Text`
    color: ${Colors.textColor};
    font-size: 16px; 
    font-weight: bold;
`;

export const MsgBox = styled.View`
    text-align: center;
    font-size: 13px; 
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${Colors.darkLight}   
`;