import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    SectionList,
    SafeAreaView,
    Image,
    FlatList, TouchableOpacity,
} from 'react-native';






const ParentsScreen = ({route, navigation} ) => {

    const jData = require("../assets/parents.json");



    const [data1, setData1] = React.useState(null);

    function dataLoader() {
        setData1(jData)
    }
    useEffect(dataLoader);

    const testPress2 = () => {
        console.log("Pressed navigate to Profs")
        navigation.navigate('Professionals')
    }

    const pressHandler = (item) => {
        alert("Likes: " + item.likes)
    }

    const ListItem = ({item}) => {
        console.log(item.likes)
        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={()=> pressHandler(item)}>
                    <Image

                        source={{uri: item.image}}
                        style={styles.itemPhoto}
                        resizeMode="cover"
                    />
                    <Text style={styles.itemText}>{item.comments}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            {data1 &&
                <SafeAreaView style={{flex: 1}}>
                    <SectionList
                        horizontal
                        contentContainerStyle={{paddingHorizontal: 10}}
                        stickySectionHeadersEnabled={false}
                        sections={data1}
                        renderSectionHeader={({section}) => (
                            <>
                                <View style={{flex: 1, flexDirection: "column"}}>
                                    <Text style={styles.sectionHeader}>{section.title}</Text>
                                    {section.horizontal ? (
                                        <FlatList
                                            //horizontal
                                            data={section.data}
                                            renderItem={({item}) => <ListItem item={item}/>}
                                            showsHorizontalScrollIndicator={false}
                                        />
                                    ) : null}
                                </View>
                            </>
                        )}
                        renderItem={({item, section}) => {
                            if (section.horizontal) {
                                return null;
                            }
                            return <ListItem item={item}/>;
                        }}
                    />
                </SafeAreaView>
            }
        </View>
    );
};


/*const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: "whitesmoke",

    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
})*/

export default ParentsScreen;






const SECTIONS = [
    {
        title: 'Made for you',
        horizontal: true,
        data: [
            {
                key: '1',
                text: 'Item text 1',
                image: 'https://picsum.photos/id/1/200',
            },
            {
                key: '2',
                text: 'Item text 2',
                image: 'https://picsum.photos/id/10/200',
            },

            {
                key: '3',
                text: 'Item text 3',
                image: 'https://picsum.photos/id/1002/200',
            },
            {
                key: '4',
                text: 'Item text 4',
                image: 'https://picsum.photos/id/1006/200',
            },
            {
                key: '5',
                text: 'Item text 5',
                uri: 'https://picsum.photos/id/1008/200',
            },
        ],
    },
    {
        title: 'Punk and hardcore',
        horizontal: true,
        data: [
            {
                key: '1',
                text: 'Item text 1',
                image: 'https://picsum.photos/id/1011/200',
            },
            {
                key: '2',
                text: 'Item text 2',
                image: 'https://picsum.photos/id/1012/200',
            },

            {
                key: '3',
                text: 'Item text 3',
                uri: 'https://picsum.photos/id/1013/200',
            },
            {
                key: '4',
                text: 'Item text 4',
                uri: 'https://picsum.photos/id/1015/200',
            },
            {
                key: '5',
                text: 'Item text 5',
                uri: 'https://picsum.photos/id/1016/200',
            },
        ],
    },
    {
        title: 'Based on your recent listening',
        horizontal: true,
        data: [
            {
                key: '1',
                text: 'Item text 1',
                image: 'https://picsum.photos/id/1020/200',
            },
            {
                key: '2',
                text: 'Item text 2',
                image: 'https://picsum.photos/id/1024/200',
            },

            {
                key: '3',
                text: 'Item text 3',
                image: 'https://picsum.photos/id/1027/200',
            },
            {
                key: '4',
                text: 'Item text 4',
                image: 'https://picsum.photos/id/1035/200',
            },
            {
                key: '5',
                text: 'Item text 5',
                image: 'https://picsum.photos/id/1038/200',
            },
        ],
    },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    sectionHeader: {
        fontWeight: '800',
        fontSize: 18,
        color: '#f4f4f4',
        marginTop: 20,
        marginBottom: 5,
        textAlign: "center"
    },
    item: {
        margin: 10,
    },
    itemPhoto: {
        width: 300,
        height: 300,
        resizeMode: "contain"

    },
    itemText: {
        color: 'rgba(255, 255, 255, 0.5)',
        marginTop: 5,
        textAlign: "center"
    },
});