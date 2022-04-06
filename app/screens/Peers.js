import {Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import React, { useState} from "react";

import {Colors} from "../components/Colors";


const PeersScreen = ({route, navigation} ) => {

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


    const pressHandler = (item) => {
        console.log(item.id);
        alert(item.description+"\n\n"+item.cost)
    }

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <FlatList
                    numColumns = {1}
                    keyExtractor={
                        item => item.id
                    }
                    data={image2}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.moviesItem} onPress={()=> pressHandler(item)}>
                            <Text style={styles.text}> {item.name} </Text>
                            <Image
                                style={styles.tinyLogo}
                                source={item.image}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );

}

const styles = StyleSheet.create ({
    background:{
      flex: 1,
      //backgroundColor: Colors.secondaryGreen,
      backgroundColor: "whitesmoke",
    },

    container: {
        flex: 1,
        paddingTop: 30,
        width: "80%",
        backgroundColor: "darkgray",
        //backgroundColor: Colors.secondaryGreen,
        alignSelf: "center",

    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
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
    tinyLogo: {

        width: '90%',
        height: 300,
        resizeMode: 'contain'
    },
})

export default PeersScreen;

