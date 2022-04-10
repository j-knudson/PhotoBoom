import {Button, Image, StyleSheet, Text, View} from "react-native";
import React, {useEffect} from "react";
import jData from "../assets/professional/profData.json";

const dTest = {"name":"John","image": "https://github.com/j-knudson/PhotoBoom/blob/7b93a8a8ab1ca804de774f716240c2b4feea3e0d/app/assets/peers/spaceballs.jpg?raw=true"}



const HomeScreen = ( {route, navigation} ) => {
    const testPress2 = () => {
        console.log("Pressed navigate to Parents")
        navigation.navigate('Peers')
    }

    const [data1, setData1] = React.useState(null);

    const users=['John', 'Mitchell', 'Jake', 'Abdul'];

    users.map((item)=>{
        console.log("my name is ",item)
    })
    function dataLoader () {
        setData1(dTest)
        console.log("In data loader")
        console.log(dTest)
    }

/*    const dataLoader = async () => {
        const { data } = await axios.get(value);
        setData1(data);
    }
    */
    useEffect(dataLoader);

    return(
        <View style={styles.container}>
            <Text> Home Screen</Text>
            {data1 &&
                <Text>
                    {data1.name}
                </Text>}
            <Button
                title="Home to Friends"
                onPress={testPress2}
            />
            {data1 &&
                <Image
                    //source={require("../assets/db_images/fs1.png")}
                    source={{uri: dTest.image}}
                    style={{width: 400, height: 400}}
                />
            }

            {users.map((item)=>
                <Text>{item}</Text>
            )}


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