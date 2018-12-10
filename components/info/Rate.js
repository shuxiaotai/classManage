import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import PublicImageItem from "../../public/components/PublicImageItem";
import listData from "../../public/mockData/listData";
import RateDetail from "./RateDetail";
import {checkUser, getTokenInfo} from "../../public/utils/checkUser";
import fetchData from "../../public/utils/fetchData";
import moment from "moment/moment";

class Rate extends Component {
    componentDidMount() {
        const { fetchRateInfo } = this.props;
        fetchRateInfo();
    }
    toRateDetail = (classId) => {
        const { navigate } = this.props.navigation;
        navigate('RateDetail', {
            classId
        });
    };
    render() {
        const { rateInfo } = this.props;
        return(
            <ScrollView
                contentContainerStyle={styles.rateListContainer}
            >
                {
                    rateInfo ? rateInfo.rateList.map((item, index) => (
                        <View
                            style={styles.rateContainer}
                            activeOpacity={0.8}
                            key={item[index]['class_id']}
                        >
                            <View style={styles.rateTitle}>
                                <Text>{moment(rateInfo.startTime).format('MM-DD')} - {moment(rateInfo.endTime).format('MM-DD')} {item[0]['class_grade']}{item[0]['class_name']}</Text>
                            </View>
                            <PublicImageItem
                                isShowSelectRightName={true}
                                selectRightFrontName=''
                                selectRightEndName='分'
                                selectRightKey='score'
                                data={rateInfo.rateList[index]}
                                avatarMarginLeft={50}
                            />
                            <TouchableOpacity
                                onPress={() => this.toRateDetail(item[index]['class_id'])}
                            >
                                <Text
                                    style={styles.detailBtn}
                                >立即查看</Text>
                            </TouchableOpacity>
                        </View>
                    )) : null
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    rateContainer: {
        marginHorizontal: 10,
        height: 270,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20
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
    },
    rateListContainer: {
        paddingBottom: 100
    }
});
export default Rate;