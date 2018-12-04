import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PublicImageItem from "../../public/components/PublicImageItem";
import PublicHeader from "../../public/components/PublicHeader";
import listData from "../../public/mockData/listData";

class RateDetail extends Component{
    render() {
        const { navigation } = this.props;
        return(
            <View>
                <PublicHeader
                    title="光荣榜详情"
                    isLeft={true}
                    navigation={navigation}
                />
                <View style={styles.rateDetailContainer}>
                    <PublicImageItem
                        rightName="1分"
                        avatarMarginLeft={50}
                        data={listData.checkList}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    rateDetailContainer: {
        // marginTop: -10,
    }
});
export default RateDetail;