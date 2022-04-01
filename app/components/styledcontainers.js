import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Constants from 'expo-constants';
import styled from 'styled-components/native';

const StatusBarHeight = Constants.statusBarHeight;

import {Colors} from "../components/Colors"



export const BackgroundContainer_withHeader = styled.View`
    flex: 1; 
    background-color: ${Colors.customBackground}; 
    align-items: center;
    justify-content: center;
    padding-bottom: ${StatusBarHeight}+500px;
    
`;
export const InnerContainer = styled.View`
    flex: 1; 
    width: 100%; 
    align-items: center; 
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    margin: 3px;
    background-color: ${Colors.darkLight}   
`;

export const LoginContainer = styled.View`
    flex: 1;
    flex-shrink: 0;
    width: 100%;
    align-items: center;
    background-color=${Colors.testPurple}
`;

export const MsgBox = styled.View`
    text-align: center;
    font-size: 13px; 
`;

export const PhotoBoomLogo = styled.Image`
    flex: .75;
    flex-shrink: 2;
    width: 50%;
    height: 50%;
    resize-mode: contain;
`;


export const PhotoBoomText = styled.Image`
  flex: 1;
  flex-shrink: 2;
  width: 70%;
  height: 25%;  
  resize-mode: contain;
  flex-shrink: 1;
`;
export const RightIcon = styled.TouchableOpacity`
    z-index: 1;
`;

export const StyledContainer = styled.View `
    flex: 1; 
    background-color: ${Colors.customBackground}; 
    align-items: center;
    justify-content: center;
    padding-bottom: 5%;
`;
export const StyledInputArea = styled.View`
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

export const StyledInputLabel = styled.Text`
    color: ${Colors.primaryBlue};
    font-size: 13px; 
    text-align: left; 
`;


export const TextButton = styled.Text`
    color: ${Colors.textColor};
    font-size: 16px; 
    font-weight: bold;
`;


export const SubmitButton = styled.TouchableOpacity`
    flex: 1;
    background-color: ${Colors.submitButtons};
    justify-content: center;
    border-radius: 10px; 
    width: 70%;
    align-items: center;  
    margin-top: 5px;
`;

export const TextError = styled.Text `
    color: ${Colors.textError};
    font-style: italic; 
`;

export const TextInputArea = styled.TextInput `
    background-color: ${Colors.inputBackground};
    color: ${Colors.textColor}; 
    font-weight: bold;
    align-content: center;
    width: 100%;
    height: 100%;
    justify-content: center; 
    text-align: center;
    flex: 1;
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


