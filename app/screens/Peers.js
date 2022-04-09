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


const PeersScreen = ({route, navigation} ) => {
    const dataTest = require("../assets/peers/PeerData.json")

    const [data1, setdata1] = React.useState();

    const [modelOpen, setModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState(null);

    function dataLoader() {
        setdata1(dataTest)
    }

    useEffect(dataLoader);


    const pressHandler = (item) => {
        setModalImage(item)
        setModalOpen(!modelOpen)
    }

    const CommentHandler = () => {
            return (
                <FlatList
                    //KeyExtractor={modalImage => modalImage.username}
                    data={modalImage.comments}
                    KeyExtractor={item => item.username}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <TextComments> {item.username}: {item.comment} </TextComments>
                    )}
                />
            )
    }


    //!********HORIZONTAL ***********************

    const ZoomView = (color) => {
        return (
        <BackgroundContainer_3p>
            <BackgroundContainer_Zoom nestedScrollEnabled={true}>
                <ZoomClose onPress={()=> setModalOpen(false)}>
                    <AntDesign name="closesquare" size={24} color={color.color} />
                </ZoomClose>
                <ZoomImage source={{uri: modalImage.image}}/>
                <ZoomRatingContainer>
                    <ZoomRating>
                        <AntDesign name="like2" size={24} color={color.color} style={{width: 25, marginRight: 5}} />
                    </ZoomRating>
                    <TextRating > {modalImage.likes}</TextRating>
                    <ZoomRating>
                        <AntDesign name="dislike1" size={24} color={color.color} />
                    </ZoomRating>
                    <TextRating > {modalImage.dislikes}</TextRating>
                </ZoomRatingContainer>
                <CommentHandler/>
            </BackgroundContainer_Zoom>
        </BackgroundContainer_3p>
        )
    }

    const ListItem = ({item}) => {
        return (
            <BoomContainer>
                <Modal visible={modelOpen}>
                        <ZoomView color={Colors.secondaryGreen}/>
                </Modal>
                <TouchableOpacity onPress={()=> pressHandler(item)}>
                    <BoomImage source={{uri: item.image}} />
                    <TextBoom>{item.comments[0].username, " ",item.comments[0].comment}</TextBoom>
                </TouchableOpacity>
            </BoomContainer>
        );
    };

    return (
        <BackgroundContainer_3p>
            <StatusBar style="light"/>
            {data1 &&
                <View style={{flex: 1}}>
                    <SectionList
                        horizontal
                        contentContainerStyle={{paddingHorizontal: 10}}
                        stickySectionHeadersEnabled={false}
                        sections={data1}
                        renderSectionHeader={({section}) => (
                            <>
                                <View style={{flex: 1, flexDirection: "column"}}>
                                    <TextSectionHeader>{section.title}</TextSectionHeader>
                                    {section.horizontal ? (
                                        <FlatList
                                            data={section.data}
                                            renderItem={({item}) => <ListItem item={item}/>}
                                        />
                                    ) : null}
                                </View>
                            </>
                        )}
                        renderItem={({item, section}) => {
                            if (section.horizontal) {
                                return null;
                            }
                            return <ListItem item={item}/>;
                        }}
                    />
                </View>
            }
        </BackgroundContainer_3p>
    );
}
export default PeersScreen;
