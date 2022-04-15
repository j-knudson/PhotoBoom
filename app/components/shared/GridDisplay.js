import {Alert, ActivityIndicator, Button, FlatList, Image, Modal, Text, TouchableOpacity, View} from "react-native";
import {
    BackgroundContainer,
    BackgroundContainer_3p,
    BoomContainer,
    BoomImage, BoomRating,
    GridContainer,
    GridImage, InputArea, InputContainer, InputLabel, SubmitContainer,
    TextBoom, TextGridAdd, TextSectionHeader,
} from "../AuthenticatedStyles";
import React, {useEffect, useState} from "react";
import {Formik} from "formik";
import {Line, MsgBox, SubmitButton, TextButton, TextError} from "../styledcontainers";
import {Colors} from "../Colors";
import axios from 'axios';

const GridDisplay = ({data1, iconColors}) => {
    const [gridData, setGridData] = useState([]);
    const [modelOpen, setModalOpen] = useState(false);

    const addPictureHandler  = () =>  {
        setModalOpen(!modelOpen)
    }

    const submitPicture = (values) => {
        console.log("form submitted  values are: ", values)
        setModalOpen(!modelOpen)
        //TODO add axios command here for sending to DB
        const res = axios.put('http://10.0.2.2:3000/images',{name: values.name, group: values.group, category: values.category, description: values.description, link: values.link}).then(function(result){
            let rep = result.data;
            if (rep === "SUCCESS"){
                //TODO enter success condition here
            }
            else{
                //TODO enter failure condition here
            }
        })
    }
    return(
        <BackgroundContainer>
            <BoomRating>
                <TextGridAdd onPress={addPictureHandler} style={{backgroundColor: iconColors}}>
                    Add a Picture
                </TextGridAdd>
            </BoomRating>
            <Modal
                visible={modelOpen}
                animationType={"slide"}
                transparent={false}
            >
                <BackgroundContainer_3p>
                    <Formik
                        //validationSchema={SignUpValidationSchema}
                        initialValues={{name: '', group: '', category: '', description: '', link: ''}}
                        onSubmit={(values, { setSubmitting }) => {
                            submitPicture(values);
                            setSubmitting(false);
                        }}
                    >
                        {({
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              values,
                              errors,
                              isValid,
                              touched,
                              isSubmitting,
                          }) => (
                            <>
                               <InputContainer>
                                    <InputLabel>Picture Name</InputLabel>
                                    <InputArea
                                        placeholder="Enter a picture name"
                                        onChangeText={handleChange('name')}
                                        onBlue={handleBlur('name')}
                                        value={values.name}
                                    />
                               </InputContainer>
                               <InputContainer>
                                    <InputLabel>Category</InputLabel>
                                    <InputArea
                                        placeholder="Enter a picture category"
                                        onChangeText={handleChange('category')}
                                        onBlue={handleBlur('category')}
                                        value={values.category}
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <InputLabel>Picture Description</InputLabel>
                                    <InputArea
                                        placeholder="Enter a picture description"
                                        onChangeText={handleChange('description')}
                                        onBlue={handleBlur('description')}
                                        value={values.description}
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <InputLabel>Picture Link</InputLabel>
                                    <InputArea
                                        placeholder="Enter a link to a picture"
                                        onChangeText={handleChange('link')}
                                        onBlue={handleBlur('link')}
                                        value={values.link}
                                    />
                                </InputContainer>
                                <SubmitContainer style={{backgroundColor:iconColors}}>
                                    <BoomRating onPress={handleSubmit}>
                                        {isSubmitting &&
                                            <ActivityIndicator size="large" color={Colors.primaryGreen} />
                                        }
                                        {!isSubmitting &&
                                            <TextSectionHeader> Add Picture </TextSectionHeader>
                                        }
                                    </BoomRating>
                                </SubmitContainer>
                            </>
                        )}
                    </Formik>
                    <SubmitContainer style={{backgroundColor:iconColors}}>
                        <BoomRating onPress={addPictureHandler}>
                            <TextSectionHeader> Cancel </TextSectionHeader>
                        </BoomRating>
                    </SubmitContainer>
                </BackgroundContainer_3p>
            </Modal>
            <FlatList
                numColumns = {2}
                keyExtractor={
                    (item) => item.id
                }
                data = {data1.data}
                renderItem={({ item }) => (
                    <GridContainer>
                            {gridData &&
                                <>
                                    <TextBoom> {item.name} </TextBoom>
                                    <GridImage source={{uri: item.image}} />
                                </>
                            }
                    </GridContainer>
                )}
            />


        </BackgroundContainer>
    )
}

export default GridDisplay;
