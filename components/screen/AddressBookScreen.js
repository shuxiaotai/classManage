import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";

class addressBookScreen extends Component{

    render() {
        return(
            <View>
                <PublicHeader title="通讯录" />
            </View>
        );
    }
}
export default addressBookScreen;