import React, {useEffect} from 'react';
import {BackgroundContainer_3p} from "../components/AuthenticatedStyles";
import BoomDisplay from "../components/shared/3p_BoomDisplay";
import {Colors} from "../components/Colors";

const ParentsScreen = ({route, navigation} ) => {
    const jData = require("../assets/parents.json");
    const [data1, setData1] = React.useState(null);

    function dataLoader() {
        setData1(jData)
    }
    useEffect(dataLoader);

    return (
        <BackgroundContainer_3p>
            {data1 &&
                <>
                    <BoomDisplay data1={data1} iconColors={Colors.primaryBlue}/>
                </>
            }
        </BackgroundContainer_3p>
    );
}
export default ParentsScreen;
