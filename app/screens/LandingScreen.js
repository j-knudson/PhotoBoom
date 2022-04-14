import {Button, Image, StyleSheet, Text, View} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import stringifySafe from "react-native/Libraries/Utilities/stringifySafe";
import axios from "axios";


//function LandingScreen(props) {



const LandingScreen =( {route, navigation} ) => {
   /* const {itemID, newEmail: passwordIs, testString, userData} = route.params*/
    const {userData, loginData} = route.params


    const testPress = () => {
        navigation.navigate('Login')
    }

        function showLoginInfo() {
        if (loginData) {
            return (
                <View style={styles.userInfo}>

                    <Text> Welcome </Text>
                    <Text>{loginData.email}</Text>
                </View>
            );
        }
    }



    const [userInfo, setUserInfo] = React.useState();
/*    function showUserInfo() {
        if (userData) {
            return (
                <View style={styles.userInfo}>
                    <Image source={{uri: userData.picture}} style={styles.profilePic} />
                    <Text>Welcome {userData.name}</Text>
                    <Text>{userData.email}</Text>
                </View>
            );
        }
    }*/


    // <Cookies> --------------------------------------------------------------------------------------------------

    const cookies = async (cookieName) => {
        await AsyncStorage.getItem(cookieName).then(function(result){
            console.log("This is result in cookies function " + result);
            if (result === null) AsyncStorage.setItem(cookieName, stringifySafe(1));
            else {
                const newRes = Number(result) + 1;
                AsyncStorage.setItem(cookieName, stringifySafe(newRes));
            }
        })
    }

    const cookiesToDb = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const result = await AsyncStorage.multiGet(keys);
            const map1 = result.map(element => element = {name: element[0], value: element[1]});
            console.log(map1);
            const res = axios.put('http://35.222.0.171:3000/cookies', {user: loginData.email, cArray: map1});

        } catch (error) {
            console.error(error)
        }
    }
    // </Cookies> -------------------------------------------------------------------------------------------------




    return (

        <View style={{justifyContent: "center", alignContent: "center",}}>
{/*            <Text>It's an older code, sir, but it checks out</Text>
            <Text>Email: {JSON.stringify(itemID)}</Text>
            <Text>Password: {JSON.stringify(passwordIs)}</Text>
            <Text>Test: {JSON.stringify(testString)}</Text>*/}
            {/*<Text>Name: {userInfo.name}</Text>*/}
            {/*{showUserInfo()}*/}
            {showLoginInfo()}
            <Button
                title={'Landing Screen Test'}
                onPress={testPress}
            />
            <Button
                title="Cookie button 1"
                color="green"
                onPress = {()=>{cookies('button1');}}/>
            <Button
                title="Cookie button 2"
                color="grey"
                onPress = {()=>{cookies('button 2');}}/>
            <Button
                title="Logout"
                color="blue"
                onPress = {()=>{cookiesToDb();}}/>

        </View>
    );
}
const styles = StyleSheet.create({
    profilePic: {
        width: 50,
        height: 50
    },
});


export default LandingScreen;
