import React, {useEffect, useState} from "react";

//Containers
import {BackgroundContainer, BackgroundContainer_3p, TextBoom,} from "../components/AuthenticatedStyles";
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import {Colors} from "../components/Colors";
import BoomDisplay from "../components/shared/3p_BoomDisplay";
import {useWindowDimensions, View} from "react-native";
import GridDisplay from "../components/shared/GridDisplay";
import axios from 'axios';

const PeersScreen = ({route, navigation} ) => {
    const dataTest = require("../assets/peers/PeerData.json")
    const g_data = require("../assets/peers/PeerGridData.json")
    const [data1, setdata1] = React.useState();
    const [gridData, setGridData] = React.useState();
    function dataLoader() {
        setdata1(dataTest)
        setGridData(g_data)
    }
    useEffect(dataLoader);

    //Playing with function to bring images in from DB
    const res = axios.post('http://10.0.2.2:3000/images',{group: 'Peer'}).then(function(result){
        let rep = result.data;
        //TODO return "data: "+rep  I think this might return something very similar to what PeerGridData.json is
        console.log("This is rep "+rep);
        rep.forEach(function(currentValue){
            console.log(currentValue)}
        )
    })

    const layout = useWindowDimensions();
    const [routes] = React.useState([
        { key: 'first', title: 'Photos' },
        { key: 'second', title: 'Booms' },
    ]);

    const FirstRoute = () => (
        <BackgroundContainer_3p>
            {gridData &&
                <GridDisplay data1={gridData} iconColors={Colors.secondaryGreen}/>
            }
        </BackgroundContainer_3p>
    )

    const SecondRoute = () => (
        <BackgroundContainer_3p>
            {data1 &&
                <>
                    <BoomDisplay data1={data1} iconColors={Colors.secondaryGreen} dataChange={dataLoader}/>
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
                activeColor={Colors.secondaryGreen}
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
export default PeersScreen;








