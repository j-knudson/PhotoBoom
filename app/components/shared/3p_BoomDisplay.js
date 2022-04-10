import {FlatList, Modal, SectionList, TouchableOpacity, View} from "react-native";
import {
    BackgroundContainer_3p,
    BackgroundContainer_Zoom, BoomContainer, BoomImage, TextBoom,
    TextComments, TextRating, TextSectionHeader,
    ZoomClose,
    ZoomImage, ZoomRating, ZoomRatingContainer
} from "../AuthenticatedStyles";
import {AntDesign} from "@expo/vector-icons";
import {Colors} from "../Colors";
import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";


const BoomDisplay = ({data1, color}) => {
    const [modelOpen, setModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState(null);

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
                    <ZoomView color={color}/>
                </Modal>
                <TouchableOpacity onPress={()=> pressHandler(item)}>
                    <BoomImage source={{uri: item.image}} />
                </TouchableOpacity>
                {item.comments[0].username !== "" &&
                    <TextBoom>{item.comments[0].username}: {item.comments[0].comment}</TextBoom>
                }
            </BoomContainer>
        );
    };

    return (
        <BackgroundContainer_3p>
            <StatusBar style="light"/>
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
        </BackgroundContainer_3p>
    );
}

export default BoomDisplay;