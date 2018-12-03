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
                const { routeName } = navigation.state;
                console.log(routeName);
                return (
                    <Icon
                        name="event-note"
                        color={tintColor}
                    />
                )
            }
        })
    },
    Info: {
        screen: InfoScreen,
        navigationOptions: () => ({
            title: '通知',
            tabBarIcon: ({tintColor}) => (
                <Icon
                    name="add-alarm"
                    color={tintColor}
                />
            )
        })
    },
    AddressBook: {
        screen: AddressBookScreen,
        navigationOptions: () => ({
            title: '通讯录',
            tabBarIcon: ({tintColor}) => (
                <Icon
                    name="assignment-ind"
                    color={tintColor}
                />
            )
        })
    },
    Me: {
        screen: MeScreen,
        navigationOptions: () => ({
            title: '我',
            tabBarIcon: ({tintColor}) => (
                <Icon
                    name="accessibility"
                    color={tintColor}
                />
            )
        })
    },
}, {
    tabBarOptions: {
        activeTintColor: '#3498db',
    }
});

export default HomeScreen;