import {Alert, Button, Text} from "react-native";
import {View} from "react-native-web";


const LandingScreen = ({navigation}) => {
    const testPress = () => {
        navigation.navigate('Login')
    }
    return (
       <View>
            <Text>It's an older code, sir, but it checks out</Text>
            <Button
                title={'Landing Screen Test'}
                onPress={testPress}
            />
       </View>
    )
}

export default LandingScreen;