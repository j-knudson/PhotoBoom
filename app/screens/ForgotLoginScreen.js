import {ImageBackground, Image, StyleSheet, View} from "react-native";




const ForgotLoginScreen = ( navigation) => {

    return (
        <ImageBackground
            resizeMode={"contain"}
            style={styles.container}
            source={require('../assets/forgot.jpg')}
        >
        </ImageBackground>


    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: "black",
    }
})
export default ForgotLoginScreen;
