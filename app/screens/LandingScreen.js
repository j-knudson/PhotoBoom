import {Button, Image, StyleSheet, Text, View} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import stringifySafe from "react-native/Libraries/Utilities/stringifySafe";
import axios from "axios";


//function LandingScreen(props) {



const LandingScreen =( {route, navigation} ) => {
    const {itemID, newEmail: passwordIs, testString, userData} = route.params
    const testPress = () => {
        navigation.navigate('Login')
    }


    const [userInfo, setUserInfo] = React.useState();
    function showUserInfo() {
        if (userData) {
            return (
                <View style={styles.userInfo}>
                    <Image source={{uri: userData.picture}} style={styles.profilePic} />
                    <Text>Welcome {userData.name}</Text>
                    <Text>{userData.email}</Text>
                </View>
            );
        }
    }
    return (

        <View style={{justifyContent: "center", alignContent: "center",}}>
            <Text>It's an older code, sir, but it checks out</Text>
            <Text>Email: {JSON.stringify(itemID)}</Text>
            <Text>Password: {JSON.stringify(passwordIs)}</Text>
            <Text>Test: {JSON.stringify(testString)}</Text>
            {/*<Text>Name: {userInfo.name}</Text>*/}
            {showUserInfo()}
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
