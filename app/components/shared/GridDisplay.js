import {FlatList, Image, Text, TouchableOpacity} from "react-native";
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




    return(
        <BackgroundContainer>
            <BoomRating>
                <TextGridAdd style={{color: iconColors}}>
                    Add a Picture
                </TextGridAdd>
            </BoomRating>


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