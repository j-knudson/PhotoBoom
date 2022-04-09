import {
    Button,
    FlatList,
    Image,
    Modal,
    SafeAreaView,
    SectionList,
    StyleSheet,
    Text,
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
    TextBoom, TextComments, TextRating,
    TextSectionHeader, ZoomClose,
    ZoomImage, ZoomRating, ZoomRatingContainer,
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
        console.log("im comment handler")
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

    const ZoomView = ({item}) => {
        console.log("zoomview 0 on item: ", modalImage.likes);
        return (
        <BackgroundContainer_3p>
            <BackgroundContainer_Zoom nestedScrollEnabled={true}>
                <ZoomClose onPress={()=> setModalOpen(false)}>
                    <AntDesign name="closesquare" size={24} color={Colors.secondaryGreen} />
                </ZoomClose>
                <ZoomImage source={{uri: modalImage.image}}/>

                <ZoomRatingContainer>
                    <ZoomRating>
                        <AntDesign name="like2" size={24} color={Colors.secondaryGreen} style={{width: 25, marginRight: 5}} />
                    </ZoomRating>
                    <TextRating > {modalImage.likes}</TextRating>
                    <ZoomRating>
                        <AntDesign name="dislike1" size={24} color={Colors.secondaryGreen} />
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
                        <ZoomView item={{modalImage}}/>
                </Modal>
                <TouchableOpacity onPress={()=> pressHandler(item)}>
                    <BoomImage source={{uri: item.image}} />
                    {/*<TextBoom>{item.comments}</TextBoom>*/}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    sectionHeader: {
        fontWeight: '800',
        fontSize: 18,
        color: '#f4f4f4',
        marginTop: 20,
        marginBottom: 5,
        textAlign: "center"
    },
    item: {
        margin: 10,
    },
    itemPhoto: {
        width: 400,
        height: 400,
        resizeMode: "contain"

    },
    itemText: {
        color: 'rgba(255, 255, 255, 0.5)',
        marginTop: 5,
        textAlign: "center"
    },
});

export default PeersScreen;

/*

    const [image2, setImage2] = useState([
        {
            name: 'Party1',
            id: '1',
            cost: '$5.00',
            description: 'Which program do Jedi use to open PDF files?\nAdobe Wan Kenobi.',
            image: require("../assets/peers/leo_party.jpg")
        },
        {
            name: 'Party2',
            id: '2',
            cost: '$20.00',
            description: 'Some Like it Hoth',
            image: require("../assets/peers/bean_party.jpg")
        },
        {
            name: 'Party3',
            id: '3',
            cost: '$10.00',
            description: 'Ewok the Line',
            image: require("../assets/peers/dwight_party.jpeg")
        },
        {
            name: 'Party4',
            id: '4',
            cost: '$8.00',
            description: 'Ludicrous Speed',
            image: require("../assets/peers/party_hard.jpg")
        },


    ])

    const [image, setImage] = useState([
        {
            name: 'Star Wars',
            id: '1',
            cost: '$5.00',
            description: 'Which program do Jedi use to open PDF files?\nAdobe Wan Kenobi.',
            image: require("../assets/peers/a_new_hope.jpg")
        },
        {
            name: 'Empire Strikes Back',
            id: '2',
            cost: '$20.00',
            description: 'Some Like it Hoth',
            image: require("../assets/peers/empire.jpg")
        },
        {
            name: 'Return of the Jedi',
            id: '3',
            cost: '$10.00',
            description: 'Ewok the Line',
            image: require("../assets/peers/jedi.jpg")
        },
        {
            name: 'Spaceballs',
            id: '4',
            cost: '$8.00',
            description: 'Ludicrous Speed',
            image: require("../assets/peers/spaceballs.jpg")
        },

    ])
    const [boom, setBoom] = useState([
        {
            name: 'Party1',
            id: '1',
            cost: '$5.00',
            description: 'Which program do Jedi use to open PDF files?\nAdobe Wan Kenobi.',
            image: require("../assets/peers/leo_party.jpg")
        },
        {
            name: 'Star Wars',
            id: '2',
            cost: '$5.00',
            description: 'Which program do Jedi use to open PDF files?\nAdobe Wan Kenobi.',
            image: require("../assets/peers/a_new_hope.jpg")
        },
        {
            name: 'Party3',
            id: '3',
            cost: '$10.00',
            description: 'Ewok the Line',
            image: require("../assets/peers/dwight_party.jpeg")
        },
        {
            name: 'Spaceballs',
            id: '4',
            cost: '$8.00',
            description: 'Ludicrous Speed',
            image: require("../assets/peers/spaceballs.jpg")
        },
    ])
 */