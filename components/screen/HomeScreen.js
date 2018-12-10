import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import InfoScreen from './InfoScreen';
import AddressBookScreen from "./AddressBookScreen";
import MeScreen from './MeScreen';
import ClassScreen from "./ClassScreen";

//#3498db
//MaterialIcons
const HomeScreen = createBottomTabNavigator({
    Class: {
        screen: ClassScreen,
        navigationOptions: ({ navigation }) => ({
            title: '课堂',
            tabBarIcon: ({focused, tintColor}) => {
                return (
                    <Icon
                        name="event-note"
                        color={tintColor}
                    />
                )
            },
            tabBarOnPress: (obj) => {
                const { params } = obj.navigation.state;
                if (params) {
                    params.onChangeselectKey(0);
                    navigation.navigate('Class');
                }
            },
        })
    },
    Info: {
        screen: InfoScreen,
        navigationOptions: ({ navigation }) => ({
            title: '通知',
            tabBarIcon: ({tintColor}) => {
                return(
                    <Icon
                        name="add-alarm"
                        color={tintColor}
                    />
                )
            },
            tabBarOnPress: (obj) => {
                const { params } = obj.navigation.state;
                if (params) {
                    params.onChangeSelectKey(1);  //全部公告和作业
                    navigation.navigate('Info');
                }else {
                    navigation.navigate('Info');
                }
            },
        })
    },
    AddressBook: {
        screen: AddressBookScreen,
        navigationOptions: ({ navigation }) => ({
            title: '通讯录',
            tabBarIcon: ({tintColor}) => {
                return(
                    <Icon
                        name="assignment-ind"
                        color={tintColor}
                    />
                )
            },
            tabBarOnPress: (obj) => {
                const { params } = obj.navigation.state;
                if (params) {
                    params.onLetterSelect(0);  //回到顶部
                    navigation.navigate('AddressBook');
                }else {
                    navigation.navigate('AddressBook');
                }
            },
        })
    },
    Me: {
        screen: MeScreen,
        navigationOptions: ({ navigation }) => ({
            title: '我',
            tabBarIcon: ({tintColor}) => {
                return(
                    <Icon
                        name="accessibility"
                        color={tintColor}
                    />
                )
            }
        })
    },
}, {
    tabBarOptions: {
        activeTintColor: '#3498db',
    }
});

export default HomeScreen;