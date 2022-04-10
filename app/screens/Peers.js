import {
    FlatList,
    Modal,
    SectionList,
    TouchableOpacity,
    View
} from "react-native";
//import Carousel from "react-native-snap-carousel";

import React, {useEffect, useState} from "react";
import {StatusBar} from "expo-status-bar";

//icons
import { AntDesign } from '@expo/vector-icons';

//Containers
import {
    BackgroundContainer_3p,
    BackgroundContainer_Zoom,
    BoomContainer,
    BoomImage,
    TextBoom,
    TextComments,
    TextRating,
    TextSectionHeader,
    ZoomClose,
    ZoomImage,
    ZoomRating,
    ZoomRatingContainer,
} from "../components/AuthenticatedStyles";
import {Colors} from "../components/Colors";
import modal from "react-native-web/dist/exports/Modal";

import BoomDisplay from "../components/shared/3p_BoomDisplay";
import {PhotoBoomText} from "../components/styledcontainers";


const PeersScreen = ({route, navigation} ) => {
    const dataTest = require("../assets/peers/PeerData.json")
    const [data1, setdata1] = React.useState();
    function dataLoader() {
        setdata1(dataTest)
    }
    useEffect(dataLoader);


    return (
        <BackgroundContainer_3p>
            {data1 &&
                <>
                    <BoomDisplay data1={data1} iconColors={Colors.secondaryGreen}/>
                </>
            }
            </BackgroundContainer_3p>
    );

}
export default PeersScreen;
