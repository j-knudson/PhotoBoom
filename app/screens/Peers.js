import React, {useEffect, useState} from "react";

//Containers
import {BackgroundContainer_3p,} from "../components/AuthenticatedStyles";

import {Colors} from "../components/Colors";
import BoomDisplay from "../components/shared/3p_BoomDisplay";

const PeersScreen = ({route, navigation} ) => {
    const dataTest = require("../assets/peers/PeerData.json")
    const [data1, setdata1] = React.useState();
    function dataLoader() {
        setdata1(dataTest)
    }
    useEffect(dataLoader);

    return (
        <BackgroundContainer_3p>
            {data1 &&
                <>
                    <BoomDisplay data1={data1} iconColors={Colors.secondaryGreen} dataChange={dataLoader}/>
                </>
            }
            </BackgroundContainer_3p>
    );

}
export default PeersScreen;
