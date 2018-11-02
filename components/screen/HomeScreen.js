import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import InfoScreen from './InfoScreen';
import AddressBookScreen from "./AddressBookScreen";
import MeScreen from './MeScreen';
import ClassScreen from "./ClassScreen";

const HomeScreen = createBottomTabNavigator({
    Class: {
        screen: ClassScreen,
        navigationOptions: () => ({
            title: '课堂',
        })
    },
    Info: {
        screen: InfoScreen,
        navigationOptions: () => ({
            title: '通知',
        })
    },
    AddressBook: {
        screen: AddressBookScreen,
        navigationOptions: () => ({
            title: '通讯录',
        })
    },
    Me: {
        screen: MeScreen,
        navigationOptions: () => ({
            title: '我',
        })
    },
});

export default HomeScreen;