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

import {Colors} from "../components/Colors";

import {StatusBar} from "expo-status-bar";


const PeersScreen = ({route, navigation} ) => {
    const dataTest = require("../assets/peers/PeerData.json")

    const [data1, setdata1] = React.useState();

    const [modelOpen, setModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState(null);

    function dataLoader() {
        setdata1(dataTest)
        //console.log(data1)
        //console.log("In data loader")
        //console.log("data1 ", data1)
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
        console.log("In ZoomView id: ",item.id);
        console.log("In ZoomView imageID: ",modalImage);
        return (
            <View>
                <TouchableOpacity onPress={()=> setModalOpen(false)}>
                    <Image

                        source={{uri: modalImage.image}}
                        style={styles.itemPhoto}
                        resizeMode="cover"
                    />
                    <Text> BOOM COUNTER: {modalImage.likes}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const ListItem = ({item}) => {
        //console.log("in ListItem id is: ",item.id);
        return (
            <View style={styles.item}>

                    <Modal visible={modelOpen}>
                            <ZoomView item={{modalImage}}/>
                    </Modal>


                <TouchableOpacity onPress={()=> pressHandler(item)}>
                    <Image

                        source={{uri: item.image}}
                        style={styles.itemPhoto}
                        resizeMode="cover"
                    />
                    <Text style={styles.itemText}>{item.comments}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
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
                                    <Text style={styles.sectionHeader}>{section.title}</Text>
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
        </View>
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




/*const styles = StyleSheet.create ({
    background:{
      //flex: 1,
      //backgroundColor: Colors.secondaryGreen,
      backgroundColor: "whitesmoke",
    },

    container: {
        //flex: 1,
        paddingTop: 30,
        //width: "80%",
        backgroundColor: "darkgray",
        //backgroundColor: Colors.secondaryGreen,
        alignSelf: "center",

    },
    horizontal: {
        flexDirection: 'row',
        //height: "100%",
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: Colors.testPurple
    },
    moviesItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //height: 80,
        //margin: 2,
        backgroundColor: "whitesmoke",
        //backgroundColor: Colors.secondaryGreen,
        resizeMode: 'contain'
    },
    sectionHeader: {
        fontWeight: '800',
        fontSize: 18,
        color: '#f4f4f4',
        marginTop: 20,
        marginBottom: 5,
    },
    tinyLogo: {
        width: '90%',
        height: 300,
        resizeMode: 'contain'
    },
    tinyLogo2: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    tinyLogo3: {
        width: "100%",
        resizeMode: 'contain'
    },
})*/

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