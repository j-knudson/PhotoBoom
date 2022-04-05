import {Button, StyleSheet, Text, View} from "react-native";



const PeersScreen = ({route, navigation} ) => {
    const testPress2 = () => {
        console.log("Pressed navigate to Parents")
        navigation.navigate('Parents')
    }
    return(
        <View style={styles.container}>
            <Text> Testing Peers Screen</Text>

            <Button
                title="Peers to Parents"
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

export default PeersScreen;