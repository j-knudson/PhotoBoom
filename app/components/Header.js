import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity ,View} from "react-native";
import {Colors} from "./Colors";

export default function Header({navigation, title, left, right}) {

    const toLeft = () => {
        let destination = left.toString()
       navigation.navigate(destination)
    }
    const toRight = () => {
        let destination = right.toString()
        navigation.navigate(destination)
    }
    const toHome = () => {
        navigation.navigate('Home')
    }
    return (
        <View style={styles.header}>
            <View style={styles.headerButton}>
                <TouchableOpacity onPress={toLeft}>
                    <Text style={{color: Colors.white, fontStyle: "italic",}}>
                        {left}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{justifyContent: "center", alignItems: "center", }}>
                <Text style={styles.headerText}>
                    {title}
                </Text>
                <TouchableOpacity onPress={toHome}>
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.headerButton}>
                <TouchableOpacity onPress={toRight}>
                    <Text style={{alignSelf:'flex-end', color: Colors.white, fontStyle: "italic", paddingRight: 5,}}>
                        {right}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        color: Colors.white,
        fontStyle: "italic",
    },
    header: {
        width: '98%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: "center"
    },
    headerButton: {
       alignSelf: "flex-end",
       height: "75%",
       width: "30%",
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: Colors.white,
        letterSpacing: 1,
    }


});