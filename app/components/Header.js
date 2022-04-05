import React from 'react';
import {Button, StyleSheet, Text, View} from "react-native";
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

    return (
        <View style={styles.header}>
            <Button
                title={left.toString()}
                onPress={toLeft}
            />
            <View >
                <Text style={styles.headerText}>
                    {title}
                </Text>
            </View>
            <Button
                title={right.toString()}
                onPress={toRight}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '95%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.primaryGreen,
        alignSelf: "center"
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: Colors.testPurple,
        letterSpacing: 1,
    }

});