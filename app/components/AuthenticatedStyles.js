import Constants from 'expo-constants';
import styled from 'styled-components/native';
import {Dimensions} from "react-native";

const StatusBarHeight = Constants.statusBarHeight;
const WindowHeight = Dimensions.get("window").height;

import {Colors} from "../components/Colors"

export const BackgroundContainer_3p = styled.View `
    flex: 1;
    background-color: ${Colors.auth_background};
    justify-content: center;
    align-items: center;
    
`;
export const BackgroundContainer_Zoom = styled.ScrollView `
    flex: 1; 
    width: 100%; 
    height: 100%; 
    resize-mode: contain; 
`;
export const BoomContainer = styled.View`
    margin: 10px;
    align-items: center;
`;
export const BoomImage = styled.Image `
    width: 400px;
    height: 400px;
    resize-mode: contain;
`;

export const TextBoom = styled.Text`
    color: ${Colors.textBoom}; 
    margin-top: 5px;
    text-align: center;
    
`;
export const TextComments = styled.Text`
    color: ${Colors.textBoom}; 
    margin-top: 20px;
    margin-left: 20px;
    
`;
export const TextSectionHeader = styled.Text`
    font-weight: 800;
    font-size: 18px;
    color: ${Colors.textColor}
    
    margin-top: 20px;
    margin-bottom: 5px;
    text-align: center;
`;

export const TextRating = styled.Text`
    color: ${Colors.textBoom}; 
    margin-right: 25px;
`;

export const ZoomClose = styled.TouchableOpacity `
    align-self: flex-end;
    z-index: 1;   
    width: 24px; 
    position: relative;
    top: 15px; 
`;

export const ZoomImage = styled.Image `
    height: ${WindowHeight-25}px; 
    resize-mode: contain;
`;
export const ZoomRatingContainer = styled.View `
    position: absolute;
    top: ${WindowHeight-30}px
    z-index: 1; 
    flex-direction: row;
    padding-left: 15px; 
`;
export const ZoomRating = styled.TouchableOpacity `
    margin-right: 2px;
`;