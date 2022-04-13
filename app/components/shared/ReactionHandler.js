import {Alert} from "react-native";
import {useEffect, useState} from "react";



const ReactionHandler = (data) => {
    if(data.likes.rated == false) {
        data.likes.rated = true;
        data.likes.count = data.likes.count+1;
    }
    else if (data.likes.rated == true && data.likes.count > 0) {
        data.likes.count = data.likes.count-1;
        data.likes.rated = false;
    }

    //TODO add axios put to update DB
    //dataChange(filteredData);
}

export default ReactionHandler;