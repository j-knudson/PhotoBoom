import {Alert} from "react-native";
import {useEffect, useState} from "react";



const ReactionHandler = (wanted, data1, reaction, opposite) => {
    //const [filteredData, setFilteredData] = useState(data1)

    console.log("In Like Handler")

    //let wanted = modalImage.id;

/*    filteredData.map(post => {
        post.data.filter((item) =>{
            if (item.id === wanted) {
                console.log(item[reaction])
                if(item[reaction] === 0) {
                    item[reaction] = item[reaction]+1;
                    item.rated = 1;
                }
                else if (item.rated === 1) {
                    item[reaction] = item[reaction]-1;
                    item.rated = 0;
                }
                else {
                    item[reaction] = item[reaction]+1;
                    item.rated = 1;
                    if (item[opposite] > 0) {
                        item[opposite] = item[opposite]-1;
                    }
                }
            }
        })
    })*/
    //TODO add axios put to update DB
    //dataChange(filteredData);

}

export default ReactionHandler;