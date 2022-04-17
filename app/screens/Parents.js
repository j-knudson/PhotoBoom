import React, {useEffect} from 'react';
import {BackgroundContainer, BackgroundContainer_3p} from "../components/AuthenticatedStyles";
import BoomDisplay from "../components/shared/3p_BoomDisplay";
import {Colors} from "../components/Colors";
import b_Data from "../assets/parents.json";
import {useWindowDimensions} from "react-native";
import GridDisplay from "../components/shared/GridDisplay";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import axios from "axios";


let serverAddress = '35.184.204.201';

const ParentsScreen = ({route, navigation} ) => {
    const b_data = require("../assets/parents.json");
    const g_data = require("../assets/ParentGrid.json")
    const [boomData, setBoomData] = React.useState(null);
    const [gridData, setGridData] = React.useState();
    const [gridLoading, setGridLoading] = React.useState(true);

    function dataLoader() {
        setBoomData(b_data)
        //setGridData(g_data)
    }
    useEffect(dataLoader);

    useEffect(()=> {
        const loadPost = async () =>{
            setGridLoading(true);
            const res = await axios.post('http://'+serverAddress+':3000/images', {group: 'parents'})
            setGridData(res.data);
            console.log("In useEffect after axios.post ");
            res.data.forEach(function(currentValue){
                console.log(currentValue);
            })
            console.log(gridData);
            setGridLoading(false);
        }
        loadPost();
    },[]);


    const layout = useWindowDimensions();
    const [routes] = React.useState([
        { key: 'first', title: 'Photos' },
        { key: 'second', title: 'Booms' },
    ]);

    const FirstRoute = () => (
        <BackgroundContainer_3p>
            {gridData &&
                <GridDisplay data1={gridData} iconColors={Colors.primaryBlue} screen='parents'/>
            }
        </BackgroundContainer_3p>
    )

    const SecondRoute = () => (
        <BackgroundContainer_3p>
            {boomData &&
                <>
                    <BoomDisplay data1={boomData} iconColors={Colors.primaryBlue} dataChange={dataLoader}/>
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
                activeColor={Colors.primaryBlue}
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
export default ParentsScreen;
