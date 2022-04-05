import HomeScreen from "../screens/HomeScreen";
import PeersScreen from "../screens/Peers";
import Header from "../components/Header";
import {Colors} from "../components/Colors";
import ParentsScreen from "../screens/Parents";
import ProfessionalsScreen from "../screens/Professionals";

import React from 'react';


import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function AuthenticatedStack() {
    return (
        <Stack.Navigator >
            <Stack.Group>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                />
                <Stack.Group>
                    <Stack.Screen
                        name="Peers"
                        component={PeersScreen}
                        options={ ( {navigation}) => {
                            return {
                                headerTitle: () =>
                                    <Header
                                        title="Peers"
                                        left="Professionals"
                                        right="Parents"
                                        navigation={navigation}
                                    />,
                                headerBackVisible: false,
                                headerStyle: {
                                    backgroundColor: Colors.secondaryGreen,
                                }
                            }
                        }}
                    />
                    <Stack.Screen
                        name="Parents"
                        component={ParentsScreen}
                        options={ ( {navigation}) => {
                            return {
                                headerTitle: () =>
                                    <Header
                                        title="Parents"
                                        left="Peers"
                                        right="Professionals"
                                        navigation={navigation}
                                    />,
                                headerBackVisible: false,
                                headerStyle: {
                                    backgroundColor: Colors.primaryBlue,
                                }
                            }
                        }}
                    />
                    <Stack.Screen
                        name="Professionals"
                        component={ProfessionalsScreen}
                        options={ ( {navigation}) => {
                            return {
                                headerTitle: () =>
                                    <Header
                                        title="Professionals"
                                        left="Parents"
                                        right="Peers"
                                        navigation={navigation}
                                    />,
                                headerBackVisible: false,
                                headerStyle: {
                                    backgroundColor: Colors.primaryRed,
                                }
                            }
                        }}
                    />
                </Stack.Group>
            </Stack.Group>

        </Stack.Navigator>
    )
}

