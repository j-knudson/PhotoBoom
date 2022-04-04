
import {
    Alert,
    Button,
    Image,
    ImageBackground,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import React, {useState} from "react";
import SignUpStyles from "../components/SignupStyles";
import {StatusBar} from "expo-status-bar";
import * as yup from "yup";
import {Octicons} from "@expo/vector-icons";
import {Formik} from "formik";




import {Colors} from "../components/Colors";


import {
    BackgroundContainer_withHeader,
    StyledContainer,
    InnerContainer,
    Line,
    LoginContainer,
    MsgBox,
    PhotoBoomLogo,
    PhotoBoomText,
    RightIcon,
    StyledFormArea,
    StyledInputArea,
    StyledInputLabel,
    SubmitButton,
    TextButton,
    TextError,
    TextInputArea,
} from "../components/styledcontainers";


import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";

const SignUpScreenMore = ( {route, navigation} ) => {


    const valuesToDb = (values) => {
        console.log(values)
        console.log("In valuesToDB")
        console.log("Dob check "+dob.toDateString())


        console.log(
            values.email,
            values.password,
            values.firstName,
            values.lastName,
            values.dateOfBirth,
        )


        const res = axios.put('http://10.0.2.2:3000/users',
            {email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
                dob: values.dateOfBirth,
            }).then(function(result) {
            let rep = result.data;

            console.log("This is rep: "+rep);
            if (rep === "SUCCESS"){
                navigation.navigate('Landing')
            }
            else if (rep === "DNE"){
                Alert.alert("That Username and/or email is not correct");
                navigation.navigate('Sign Up');
            }
            else if (rep === "BADPW"){
                Alert.alert("That Username and/or email is not correct");
            }
            else {
                Alert.alert("An error occured " + result.data);
                navigation.navigate('SignUpMore', {
                    u_email: values.email,
                    u_password: values.password
                });
            }})
    }

    const {u_email, u_password} = route.params

    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1))

    const [isWeb, setIsWeb] = useState(true);
    async function webCheck (){
        if (Platform.OS === 'web') {
            setIsWeb(true)
            return true;
        }
        else {
            setIsWeb(false)
        }
    }

    React.useEffect(webCheck)

    //Actual date of birth to be sent
    const[dob, setDob] = useState();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate);
        console.log(dob);
    }

    const showDatePicker = () => {
        setShow(true);
    }

    return (
        <StyledContainer>
            <StatusBar style="auto" />
            <InnerContainer>
                <PhotoBoomText source={require('../assets/photo_boom_text.png')}/>
            </InnerContainer>

            <InnerContainer>
                <PhotoBoomLogo source={require('../assets/photoboom_logo.png')}/>
            </InnerContainer>

            <LoginContainer>
                {show && (
                    <DateTimePicker
                        testId="datetimePicker"
                        value={date}
                        mode="date"
                        is24hour={true}
                        display={"default"}
                        onChange={onChange}
                    />
                    )}
                {/*//TODO add on submit loading spinner */}
                <Formik
                        validationSchema={SignUpMoreValidationSchema}
                        initialValues={{firstName: '', lastName: '', dateOfBirth: '', email: u_email, password: ''}}
                        //onSubmit={values => console.log(values)}
                        onSubmit={valuesToDb}
                    >
                        {({
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              values,
                              errors,
                              isValid,
                              touched,
                          }) => (
                            <>
                            <MyTextInput
                                label="First Name"
                                icon = "person"
                                name="firstName"
                                placeholder="Joe"
                                placeholderTextColor="gray"
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                                value={values.firstName}
                            />
                            <MyTextInput
                                label="Last Name"
                                icon = "person"
                                name="lastName"
                                placeholder="Sixpack"
                                placeholderTextColor="gray"
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                                value={values.lastName}

                            />
                            {/*//TODO datepicker values not submitting correctly with dob for mobile */}
                            <MyTextInput
                                label="Date of Birth"
                                icon = "calendar"
                                name="dateOfBirth"
                                placeholder="YYYY - MM - DD"
                                placeholderTextColor="gray"
                                onChangeText={handleChange('dateOfBirth')}
                                onBlur={handleBlur('dateOfBirth')}
                                value={isWeb ? values.dateOfBirth : dob ? dob.toDateString() : ''}
                                isDate={true}
                                editable={isWeb}
                                showDatePicker={showDatePicker}
                            />
                            <MsgBox>
                                {errors.firstName && touched.firstName &&
                                    <TextError>{errors.firstName}</TextError>
                                }
                                {errors.lastName && touched.lastName &&
                                    <TextError>{errors.lastName}</TextError>
                                }
                            </MsgBox>

                            <SubmitButton onPress={handleSubmit}>
                                <TextButton>Submit Registration </TextButton>
                            </SubmitButton>
                            <Line />
                            </>
                        )}
                    </Formik>
            </LoginContainer>
        </StyledContainer>
    );
}

const SignUpMoreValidationSchema = yup.object().shape({
    firstName: yup
        .string()
        .required('First name is required'),
    lastName: yup
        .string()
        .required('Last name is required'),
})

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, isDate, isWeb, showDatePicker, ...props}) => {
    return (
        <View style={{width: "75%", flex: 2}}>
            <StyledInputLabel> {label} </StyledInputLabel>
            <StyledInputArea>
                <Octicons name={icon} size={25} color={Colors.iconColors}/>
                {(!isDate || Platform.OS=='web') && (
                        <TextInputArea {...props} />
                 )}
                {isDate && Platform.OS!='web' && (
                    <TouchableOpacity  onPress={showDatePicker}>
                        <TextInputArea {...props} />
                    </TouchableOpacity>
                )}
                {isPassword && (
                    <RightIcon onPress={()=> {setHidePassword.setHidePassword(!hidePassword)}}>
                        <Octicons  name={hidePassword ? 'eye' : 'eye-closed'} size={25} color={Colors.iconColors}/>
                    </RightIcon>
                )}
                {!isPassword && (
                    <View>
                        <Octicons  name="thumbsup" size={25} color={Colors.inputBackground}/>
                    </View>
                )}
            </StyledInputArea>
        </View>
    );
};

const onFormikSubmit = (values, dob) => {
    console.log(values)
    console.log("Sign up More Submitted")
}





export default SignUpScreenMore;
