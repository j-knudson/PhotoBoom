import React, {useEffect, useState} from 'react';

import {BackgroundContainer, BackgroundContainer_3p} from "../components/AuthenticatedStyles";
import BoomDisplay from "../components/shared/3p_BoomDisplay";
import {Colors} from "../components/Colors";
import b_data from "../assets/parents.json";
import g_data from "../assets/ParentGrid.json";
import {useWindowDimensions} from "react-native";
import GridDisplay from "../components/shared/GridDisplay";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";


const ProfessionalsScreen = ({route, navigation} ) => {

   //TODO replace require with JSON from db query
    const b_data = require("../assets/professional/profData.json");
    const g_data = require("../assets/professional/profGrid.json")
    const [boomData, setBoomData] = React.useState(null);
    const [gridData, setGridData] = React.useState();

    function dataLoader() {
        setBoomData(b_data)
        setGridData(g_data)
    }
    useEffect(dataLoader);

    const layout = useWindowDimensions();
    const [routes] = React.useState([
        { key: 'first', title: 'Photos' },
        { key: 'second', title: 'Booms' },
    ]);

    const FirstRoute = () => (
        <BackgroundContainer_3p>
            {gridData &&
                <GridDisplay data1={gridData} iconColors={Colors.primaryRed} screen='professionals'/>
            }
        </BackgroundContainer_3p>
    )

    const SecondRoute = () => (
        <BackgroundContainer_3p>
            {boomData &&
                <>
                    <BoomDisplay data1={boomData} iconColors={Colors.primaryRed} dataChange={dataLoader}/>
                </>
            }
        </BackgroundContainer_3p>
    )

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    const renderTabBar = props => (
        <BackgroundContainer>
            <TabBar
                {...props}
                activeColor={Colors.primaryRed}
                inactiveColor={'black'}
                style={{marginTop:5, backgroundColor:Colors.white}}
            />
        </BackgroundContainer>
    );

    const [index, setIndex] = React.useState(0);


    return (

        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />

    );

}

export default ProfessionalsScreen;
