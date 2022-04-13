import {FlatList, Image, Text, TouchableOpacity} from "react-native";
import {
    BackgroundContainer_3p,
    BoomContainer,
    BoomImage,
    GridContainer,
    GridImage,
    TextBoom
} from "../AuthenticatedStyles";
import React, {useEffect, useState} from "react";


const GridDisplay = ({data1, iconColors}) => {
    const [gridData, setGridData] = useState([]);
    return(
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

    )
}

export default GridDisplay;