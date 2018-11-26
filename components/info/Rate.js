import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PublicImageItem from "../../public/components/PublicImageItem";
import listData from "../../public/mockData/listData";
import RateDetail from "./RateDetail";

class Rate extends Component {
    toRateDetail = () => {
        const { navigate } = this.props.navigation;
        navigate('RateDetail');
    };
    render() {
        return(
            <View style={styles.rateContainer}>
                <View style={styles.rateTitle}>
                    <Text>11.05 - 11.11 一年级三班</Text>
                </View>
                <PublicImageItem
                    rightName="1分"
                    data={listData.rateList}
                    avatarMarginLeft={50}
                />
                <Text
                    style={styles.detailBtn}
                    onPress={this.toRateDetail}
                >立即查看</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rateContainer: {
        marginHorizontal: 10,
        height: 270,
        backgroundColor: '#fff',
        borderRadius: 10
    },
    rateTitle: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: 'skyblue',
        height: 60,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    detailBtn: {
        textAlign: 'center',
        marginTop: 10,
        color: '#3498db'
    }
});
export default Rate;