import {Button, Image, StyleSheet, Text, View} from "react-native";
import React from "react";



const HomeScreen = ( {route, navigation} ) => {
    const testPress2 = () => {
        console.log("Pressed navigate to Friends")
        navigation.navigate('Peers')
    }

    return(
        <View style={styles.container}>
            <Text> Testing Home Screen</Text>
            <Button
                title="Home to Friends"
                onPress={testPress2}
            />
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: "whitesmoke",

    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
})

export default HomeScreen;