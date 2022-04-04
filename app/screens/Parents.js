import {Button, StyleSheet, Text, View} from "react-native";



const ParentsScreen = ({route, navigation} ) => {
    const testPress2 = () => {
        console.log("Pressed navigate to Profs")
        navigation.navigate('Professionals')
    }
    return(
        <View style={styles.container}>
            <Text> Testing Parents Screen</Text>
            <Button
                title="Parents to Professionals"
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

export default ParentsScreen;