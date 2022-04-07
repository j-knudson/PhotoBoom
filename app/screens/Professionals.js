import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    SectionList,
    SafeAreaView,
    Image,
    FlatList,
} from 'react-native';



//testing for importing JSON
import {p_data} from "../assets/professional/pData2";


const ProfessionalsScreen = ({route, navigation} ) => {

    const jData = require("../assets/professional/profData.json");



    const [data1, setdata1] = React.useState();

    function dataLoader () {
        setdata1(jData.data)
        //console.log(data1)
        console.log("In data loader")
        console.log("data1 ", data1)
    }
    useEffect(dataLoader);

    const ListItem = ({ item }) => {
        console.log(item.description)
        return (
            <View style={styles.item}>
                <Image
                    source={item.image}
                    //source={{uri: item.image}}
                    style={styles.itemPhoto}
                    resizeMode="cover"
                />
                <Text style={styles.itemText}>{item.text}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <SafeAreaView style={{ flex: 1 }}>
                <SectionList
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    stickySectionHeadersEnabled={false}
                    //sections={SECTIONS}
                    sections={p_data}
                    renderSectionHeader={({ section }) => (
                        <>
                            <Text style={styles.sectionHeader}>{section.title}</Text>
                            {section.data ? (
                                <FlatList
                                    horizontal
                                    data={section.data}
                                    renderItem={({ item }) => <ListItem item={item} />}
                                    //showsHorizontalScrollIndicator={false}
                                />
                            ) : null}
                        </>
                    )}
                    renderItem={({ item, section }) => {
                        if (section.horizontal) {
                            return null;
                        }
                        return <ListItem item={item} />;
                    }}
                />
            </SafeAreaView>
        </View>
    );
};


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
    },
    item: {
        margin: 10,
    },
    itemPhoto: {
        width: 500,
        height: 500,
        resizeMode: "contain"

    },
    itemText: {
        color: 'rgba(255, 255, 255, 0.5)',
        marginTop: 5,
    },
});

const SECTIONS = [
    {
        title: 'Boom1',
        horizontal: true,
        data: [
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
        ],
    },
    {
        title: 'Boom2',
        horizontal: true,
        data: [
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
        ],
    },
];

export default ProfessionalsScreen;