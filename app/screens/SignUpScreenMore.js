
import {Image, ImageBackground, Platform, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import SignUpStyles from "../components/SignupStyles";
import {StatusBar} from "expo-status-bar";
import * as yup from "yup";
import {Octicons} from "@expo/vector-icons";
import {Formik} from "formik";
import styled from 'styled-components/native';



import {Colors} from "../components/styles";
//import {Title} from "../components/styledcontainers";

import DateTimePicker from '@react-native-community/datetimepicker';
import customStyle from "../components/styles";
const SignUpScreenMore = ( {route, navigation} ) => {



    const {u_email} = route.params

    const [hidePassword, setHidePassword] = useState(false);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1))

    const [isWeb, setIsWeb] = useState(true);
    const webCheck = () => {
        if (Platform.OS === 'web') {
            setIsWeb(true)
            console.log("web check found a web")
        }
        else {
            setIsWeb(false)
        }
        console.log(u_email)
    }

    React.useEffect(webCheck)

    //Actual date of birth to be sent
    const[dob, setDob] = useState();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate);
        console.log(show);
    }

    const showDatePicker = () => {
        setShow(true);
    }


    return (
        <View style={SignUpStyles.container}>
            <StatusBar style="auto" />
            <View style={SignUpStyles.innerContainer}>
                <Text>Email: {JSON.stringify(u_email)}</Text>

                <Image
                    resizeMode={"contain"}
                    style={SignUpStyles.photoboomText}
                    source={require("../assets/photo_boom_text.png")}
                />
{/*            </View>*/}
{/*            <View style={SignUpStyles.innerContainer}>*/}
                <Image
                    resizeMode={"contain"}
                    style={SignUpStyles.photoboomLogo}
                    source={require("../assets/photoboom_logo.png")}
                />
{/*            </View>*/}
            <View style={SignUpStyles.loginContainer}>
                {show && (
                    <DateTimePicker
                        testId="datetimePicker"
                        value={date}
                        mode='date'
                        is24hour={true}
                        display={"default"}
                        onChange={onChange}
                    />
                    )}
                <Formik
                        validationSchema={SignUpValidationSchema}
                        initialValues={{firstName: '', lastName: '', dateOfBirth: ''}}
                        //onSubmit={values => console.log(values)}
                        onSubmit={onFormikSubmit}
                    >
                        {({
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              values,
                              errors,
                              isValid,
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
                                //keyboardType="email-address"
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
                                //editable={true}
                                showDatePicker={showDatePicker}
                            />
                            <View style={SignUpStyles.errorMessageBox}>
                               {/* <Text> ... </Text>*/}
                                {errors.firstName &&
                                    <Text style={customStyle.errorText}>{errors.firstName}</Text>
                                }
                                {errors.lastName &&
                                    <Text style={customStyle.errorText}>{errors.lastName}</Text>
                                }
                            </View>

                            <TouchableOpacity style={SignUpStyles.StyledButton} onPress={handleSubmit}>
                                <Text style={SignUpStyles.text}> Submit Registration </Text>
                            </TouchableOpacity>
                            </>
                        )}
                    </Formik>

            </View>
            </View>
        </View>
    );
}
const SignUpValidationSchema = yup.object().shape({
    firstName: yup
        .string()
        .required('First name is required'),
    lastName: yup
        .string()
        .required('Last name is required'),
})


const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, isDate, isWeb, showDatePicker, ...props}) => {
    return (
        <View style={SignUpStyles.StyledContainer}>
            <Text style={SignUpStyles.InputLabel}>{label}:</Text>

                <View style={SignUpStyles.TextInputArea}>
                    <View style={SignUpStyles.leftIcon}>
                        <Octicons name={icon} size={25} color="red"/>
                    </View>
                    {!isDate && !isWeb && (
                        <TextInput
                            style={SignUpStyles.text}
                            {...props}
                        />
                    )}
                    {isDate && (
                        <TouchableOpacity  onPress={showDatePicker}>
                            <TextInput
                                style={SignUpStyles.textCalendar}
                                {...props}
                            />
                        </TouchableOpacity>
                    )}
                    {/*blank area so content lines up correctly with password area below*/}
                    <View style={SignUpStyles.rightIcon}>
                        {isPassword && (
                            <TouchableOpacity onPress={()=> {setHidePassword.setHidePassword(!hidePassword)}}>
                            {/*<TouchableOpacity onPress={PasswordVisibility}>*/}
                                <Octicons  name={hidePassword ? 'eye' : 'eye-closed'} size={25} color="red"/>
                            </TouchableOpacity>
                        )}

                    </View>

                </View>
        </View>



/*        <View>
            <View style={SignUpStyles.leftIcon}>
                <Octicons name={icon} size={25} color={Colors.primaryGreen}/>
            </View>

        </View>*/

    );
};

const onFormikSubmit = values => {
    console.log(values)
    console.log("Sign up More Submitted")
}

export default SignUpScreenMore;
