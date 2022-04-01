
import {Image, ImageBackground, Platform, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import SignUpStyles from "../components/SignupStyles";
import {StatusBar} from "expo-status-bar";
import * as yup from "yup";
import {Octicons} from "@expo/vector-icons";
import {Formik} from "formik";




import {Colors} from "../components/Colors";

//Custom styled-components
import * as styled from "../components/styledcontainers";

import {StyledContainer, InnerContainer, PhotoboomLogo, StyledFormArea } from "../components/styledcontainers";


import DateTimePicker from '@react-native-community/datetimepicker';
import customStyle from "../components/styles";
import {MsgBox} from "../components/styledcontainers";
const SignUpScreenMore = ( {route, navigation} ) => {

    const {u_email} = route.params

    const [hidePassword, setHidePassword] = useState(false);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1))

    const [isWeb, setIsWeb] = useState(true);
    async function webCheck (){
        if (Platform.OS === 'web') {
            setIsWeb(true)
            console.log("web check found a web")
            return true;
        }
        else {
            setIsWeb(false)
        }
        console.log("web check value is: "+isWeb)
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
        <StyledContainer>
            <StatusBar style="auto" />
            <View style={SignUpStyles.innerContainer}>
                <Text>Test Output Email is: {JSON.stringify(u_email)}</Text>
                <Image
                    resizeMode={"contain"}
                    style={SignUpStyles.photoboomText}
                    source={require("../assets/photo_boom_text.png")}
                />
{/*            </View>*/}
{/*            <View style={SignUpStyles.innerContainer}>*/}
{/*                <Image
                    resizeMode={"contain"}
                    style={SignUpStyles.photoboomLogo}
                    source={require("../assets/photoboom_logo.png")}
                />*/}
                <PhotoboomLogo source={require('../assets/photoboom_logo.png')}/>
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
                                i
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
                                showDatePicker={showDatePicker}
                                isPassword={true}
                            />
{/*                            <View style={SignUpStyles.errorMessageBox}>
                                <Text> ... </Text>
                                {errors.firstName &&
                                    <Text style={customStyle.errorText}>{errors.firstName}</Text>
                                }
                                {errors.lastName &&
                                    <Text style={customStyle.errorText}>{errors.lastName}</Text>
                                }
                            </View>*/}
                            <styled.MsgBox>

                                {errors.firstName &&
                                    <Text style={customStyle.errorText}>{errors.firstName}</Text>
                                }
                                {errors.lastName &&
                                    <Text style={customStyle.errorText}>{errors.lastName}</Text>
                                }
                            </styled.MsgBox>
                            <styled.StyledButton2 onPress={handleSubmit}>
                                    <styled.ButtonText>
                                        Submit Registration
                                    </styled.ButtonText>
                            </styled.StyledButton2>
                            <styled.Line />
{/*                                <View><TouchableOpacity style={SignUpStyles.StyledButton} onPress={handleSubmit}>
                                    <Text style={SignUpStyles.text}> Submit Registration </Text>
                                </TouchableOpacity></View>*/}
                            </>
                        )}
                    </Formik>

            </View>
            </View>
        </StyledContainer>
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
    console.log("end of mytext, is web: "+isWeb)
    console.log("end of mytext, is date: "+isDate)
    return (
  /*      <View style={SignUpStyles.StyledContainer}>
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
                    {/!*blank area so content lines up correctly with password area below*!/}
                    <View style={SignUpStyles.rightIcon}>
                        {isPassword && (
                            <TouchableOpacity onPress={()=> {setHidePassword.setHidePassword(!hidePassword)}}>
                            {/!*<TouchableOpacity onPress={PasswordVisibility}>*!/}
                                <Octicons  name={hidePassword ? 'eye' : 'eye-closed'} size={25} color="red"/>
                            </TouchableOpacity>
                        )}

                    </View>

                </View>
        </View>*/



        <View style={{width: "75%", flex: 2}}>
            <styled.StyledInputLabel> {label} </styled.StyledInputLabel>
            <styled.LeftIcon2>
                <Octicons name={icon} size={25} color={Colors.iconColors}/>
                {(!isDate || Platform.OS=='web') && (
                        <styled.StyledTextInput3 {...props} />
                 )}
                {isDate && Platform.OS!='web' && (
                    <TouchableOpacity  onPress={showDatePicker}>
                        <styled.StyledTextInput2 {...props} />
                    </TouchableOpacity>
                )}
                {isPassword && (
                    <styled.RightIcon onPress={()=> {setHidePassword.setHidePassword(!hidePassword)}}>
                        <Octicons  name={hidePassword ? 'eye' : 'eye-closed'} size={25} color={Colors.iconColors}/>
                    </styled.RightIcon>
                )}
                {!isPassword && (
                    <View>
                        <Octicons  name="thumbsup" size={25} color={Colors.primaryBlue}/>
                    </View>
                )}
            </styled.LeftIcon2>


        </View>

    );
};

const onFormikSubmit = values => {
    console.log(values)
    console.log("Sign up More Submitted")
}

export default SignUpScreenMore;
