import {Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import {Colors} from "../components/Colors";


const PeersScreen = ({route, navigation} ) => {

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
                    data={
                        [
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
                        ]
                    }
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
      backgroundColor: Colors.secondaryGreen,
    },

    container: {
        flex: 1,
        paddingTop: 30,
        width: "80%",
        backgroundColor: Colors.customBackground,
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
        margin: 2,
        backgroundColor: 'thistle',
        resizeMode: 'contain'
    },
    tinyLogo: {

        width: '90%',
        height: 300,
        resizeMode: 'contain'
    },
})

export default PeersScreen;

