import React, {useEffect, useState} from 'react';

import {BackgroundContainer_3p} from "../components/AuthenticatedStyles";
import BoomDisplay from "../components/shared/3p_BoomDisplay";
import {Colors} from "../components/Colors";


const ProfessionalsScreen = ({route, navigation} ) => {

   //TODO replace require with JSON from db query
    const jData = require("../assets/professional/profData.json");
    const [data1, setdata1] = React.useState();

    function dataLoader () {
        setdata1(jData)
        console.log("In data loader")
    }
    useEffect(dataLoader);

    return (
        <BackgroundContainer_3p>
            {data1 &&
                <>
                    <BoomDisplay data1={data1} iconColors={Colors.primaryRed}/>
                </>
            }
        </BackgroundContainer_3p>
    );
};

export default ProfessionalsScreen;