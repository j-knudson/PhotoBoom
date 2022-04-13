import {FlatList, Modal, SectionList, TouchableOpacity, View} from "react-native";
import {
    BackgroundContainer_3p, BackgroundContainer_Zoom, BoomContainer,
    BoomImage, BoomRating, BoomRatingContainer,
    TextBoom, TextComments, TextRating, TextSectionHeader,
    ZoomClose, ZoomImage, ZoomRating, ZoomRatingContainer
} from "../AuthenticatedStyles";
import {AntDesign} from "@expo/vector-icons";
import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";

const BoomDisplay = ({data1, iconColors, dataChange}) => {
    const [modelOpen, setModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    const [filteredData, setFilteredData] = useState(data1)

    function useForceUpdate() {
        let [value, setState] = useState(true);
        return () => setState(!value);
    }

    const likeHandler = () => {
        let wanted = modalImage.id;

        filteredData.map(post => {
            post.data.filter((item) =>{
                if (item.id === wanted) {
                    if(item.rated === 0) {
                        item.likes = item.likes+1;
                        item.rated = 1;
                    }
                    else if (item.rated === 1) {
                        item.likes = item.likes-1;
                        item.rated = 0;
                    }
                    else {
                        item.likes = item.likes+1;
                        item.rated = 1;
                        if (item.dislikes > 0) {
                            item.dislikes = item.dislikes-1;
                        }
                    }
                }
            })
        })
        //TODO add axios put to update DB
        //dataChange(filteredData);

    }
    const dislikeHandler = () => {
        let wanted = modalImage.id;

        filteredData.map(post => {
            post.data.filter((item) =>{
                if (item.id === wanted) {
                    if(item.rated === 0) {
                        item.dislikes = item.dislikes+1;
                        item.rated = -1;
                    }
                    else if (item.rated === -1) {
                        item.dislikes = item.dislikes-1;
                        item.rated = 0;
                    }
                    else {
                        item.dislikes = item.dislikes+1;
                        item.rated = -1;
                        if (item.likes > 0) {
                            item.likes = item.likes-1;
                        }
                    }
               }
            })
        })
    }

    const pressHandler = (item) => {
        setModalImage(item)
        setModalOpen(!modelOpen)
    }

    const CommentHandler = () => {
        const data = modalImage.comments;
        return (
            <View>
                {data [0].username !="" && (
                    <View>
                        {data.map((item) => (
                            <TextComments key={item.username}> {item.username}: {item.comment}</TextComments>
                        ))}
                    </View>
                )}
            </View>
        );
    }
    const ZoomView = () => {
        let forceUpdate = useForceUpdate();
        return (
            <BackgroundContainer_3p>
                <BackgroundContainer_Zoom nestedScrollEnabled={true}>
                    <ZoomClose onPress={()=> setModalOpen(false)}>
                        <AntDesign name="closesquare" size={24} color={iconColors} />
                    </ZoomClose>
                    <ZoomImage source={{uri: modalImage.image}}/>
                    <ZoomRatingContainer>
                        <ZoomRating onPress={() => {
                            likeHandler();
                            forceUpdate();
                        }}>
                            <AntDesign name={modalImage.rated === 1 ? "like1" : "like2" } size={24} color={iconColors} style={{width: 25, marginRight: 5}} />
                        </ZoomRating >
                        <TextRating > {modalImage.likes}</TextRating>
                        <ZoomRating onPress={() => {
                            dislikeHandler();
                            forceUpdate();
                        }}>
                            <AntDesign name={modalImage.rated === -1 ? "dislike1" : "dislike2" } size={24} color={iconColors} />
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
                    <ZoomView />
                </Modal>
                <TouchableOpacity onPress={()=> pressHandler(item)}>
                    <BoomImage source={{uri: item.image}} />
                </TouchableOpacity>
                {/*TODO add touchable opacity and function to add a comment*/}
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
                            <View style={{flex: 1, flexDirection: "column", justifyContent: "center"}}>
                                <TextSectionHeader>{section.title}</TextSectionHeader>
                                <BoomRatingContainer>
                                    <BoomRating>
                                        <AntDesign name="like1" size={24} color={iconColors} style={{width: 25, marginRight: 5}} />
                                    </BoomRating>
                                    <TextRating>
                                        {section.likes}
                                    </TextRating>
                                </BoomRatingContainer>
                                {section.horizontal ? (
                                    <FlatList
                                        data={section.data}
                                        renderItem={({item}) => <ListItem item={item} />}
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