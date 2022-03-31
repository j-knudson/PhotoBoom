import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Constants from 'expo-constants';
import styled from 'styled-components';

const StatusBarHeight = Constants.statusBarHeight;

import Colors from "../components/styles"



export const  StyledContainer = styled.div `
    flex: 1; 
    padding: 25px; 
    background-color: ${Colors.smoke}; 
`;

export const InnerContainer = styled.input `
    flex: 1;
    width: 100%;
    align-items; center; 
`;


export const CustomText = styled.div `
    color: ${Colors.primaryGreen}
`;

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;