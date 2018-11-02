import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";

class meScreen extends Component{

    render() {
        return(
            <View>
                <PublicHeader title="我" />
            </View>
        );
    }
}
export default meScreen;