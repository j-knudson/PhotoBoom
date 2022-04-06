import {Image, StyleSheet, View} from "react-native";
import Animated, {useSharedValue, useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {useEffect} from "react";



const SplashScreen = () => {

    const opacity = useSharedValue(0);
    const scale = useSharedValue(1);

    const reanimatedImage = useAnimatedStyle(() =>{
        return {
            width: "70%",
            height: "70%",
            opacity: opacity.value,
            transform: [
                { scale: scale.value },
                { rotate: `${scale.value * 4 * Math.PI}rad` },
            ],
        }
    }, [])

    useEffect(() =>{
        opacity.value = withTiming(1, {duration: 2000});
        scale.value = withTiming(.5, {duration: 2000})
    });

    return (
        <View style={styles.container}>
            <Animated.Image
                resizeMode={"contain"}
                style={[
                    {width: "70%", height: "70%"},
                    reanimatedImage,
                ]}
                source={require('../assets/photoboom_logo.png')}
            >
            </Animated.Image>
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

    }
})
export default SplashScreen;
