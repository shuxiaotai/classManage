import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PublicImageItem from "../../public/components/PublicImageItem";
import PublicHeader from "../../public/components/PublicHeader";
import listData from "../../public/mockData/listData";
import { connect } from 'react-redux';
import {checkUser} from "../../public/utils/checkUser";
import fetchData from "../../public/utils/fetchData";
import * as studentActions from '../class/Actions/studentAction';

class RateDetail extends Component{
    componentDidMount() {
        const { setStudentList, navigation } = this.props;
        const { classId } = navigation.state.params;
        const { navigate } = navigation;
        checkUser(() => {
            fetchData.postData('/studentList',
                {
                    currentClassId: classId,
                    isRate: true
                }
            ).then((val) => {
                setStudentList(val.studentList);
            });
        }, navigate);
    }
    render() {
        const { navigation, studentList } = this.props;
        return(
            <View>
                <PublicHeader
                    title="光荣榜详情"
                    isLeft={true}
                    navigation={navigation}
                />
                <View style={styles.rateDetailContainer}>
                    <PublicImageItem
                        isShowSelectRightName={true}
                        selectRightFrontName=''
                        selectRightEndName='分'
                        selectRightKey='score'
                        avatarMarginLeft={50}
                        data={studentList}
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
const mapStateToProps = (state) => {
    return {
        studentList: state.studentReducer.studentList
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setStudentList: (studentList) => {
            dispatch(studentActions.setStudentList(studentList));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(RateDetail);