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

//Containers
import {
    BackgroundContainer_3p,
    BackgroundContainer_Zoom,
    BoomContainer,
    BoomImage,
    TextBoom,
    TextSectionHeader,
    ZoomImage,
} from "../components/AuthenticatedStyles";


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
        console.log("in presshandler id is: ",item.id);
        //console.log("data1 ",data1.description)
        //console.log("dataTest ", dataTest.data.description)
        //alert(item.description + "\n\n" + item.cost)
        setModalImage(item)
        setModalOpen(!modelOpen)
    }


    //!********HORIZONTAL ***********************

    const ZoomView = ({item}) => {
        return (
        <BackgroundContainer_3p>
            <BackgroundContainer_Zoom>

                    <TouchableOpacity onPress={()=> setModalOpen(false)}>
                        <ZoomImage source={{uri: modalImage.image}}/>

                    </TouchableOpacity>
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
                    <TextBoom>{item.comments}</TextBoom>
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