import {Button, StyleSheet, Text, View} from "react-native";



const ProfessionalsScreen = ({route, navigation} ) => {
    const testPress2 = () => {
        console.log("Pressed navigate to Profs")
        navigation.navigate('Peers')
    }
    return(
        <View style={styles.container}>
            <Text> Testing Professionals Screen</Text>
            <Button
                title="Professionals to Peers"
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

export default ProfessionalsScreen;