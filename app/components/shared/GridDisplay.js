import {Button, FlatList, Image, Modal, Text, TouchableOpacity} from "react-native";
import {
    BackgroundContainer,
    BackgroundContainer_3p,
    BoomContainer,
    BoomImage, BoomRating,
    GridContainer,
    GridImage,
    TextBoom, TextGridAdd
} from "../AuthenticatedStyles";
import React, {useEffect, useState} from "react";


const GridDisplay = ({data1, iconColors}) => {
    const [gridData, setGridData] = useState([]);
    const [modelOpen, setModalOpen] = useState(false);

    const addPictureHandler  = () =>  {
        console.log("in add picture")
        setModalOpen(!modelOpen)
    }

    const PictureInput = () => {
        return (
            <BackgroundContainer_3p>
                <TextBoom>Hello world</TextBoom>
            </BackgroundContainer_3p>
        )

    }

    return(
        <BackgroundContainer>
            <BoomRating>
                <TextGridAdd onPress={addPictureHandler} style={{color: iconColors}}>
                    Add a Picture
                </TextGridAdd>
            </BoomRating>

            <Modal visible={modelOpen}>
                <PictureInput />
                <Button
                    title="Close Modal"
                    onPress={()=> setModalOpen(false)}
                >
                </Button>
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