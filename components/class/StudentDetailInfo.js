import React, { Component } from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import PublicBtn from "../../public/components/PublicBtn";
import PublicHorizontalItem from "../../public/components/PublicHorizontalItem";
import EditOrCreateName from "./EditOrCreateName";
import * as studentActions from "./Actions/studentAction";
import {connect} from "react-redux";
import fetchData from "../../public/utils/fetchData";
import {checkUser} from "../../public/utils/checkUser";

class StudentDetailInfo extends Component{

    toEditStudentName = () => {
        const { navigation } = this.props;
        const { navigate } = navigation;
        const { currentStudent } = navigation.state.params;
        navigate('EditOrCreateName', ({
            title : '学生姓名',
            leftText: '取消',
            rightText: '保存',
            leftName: currentStudent.name,
            rightPressFun: this.saveStudentName
        }));
    };
    saveStudentName = (name) => {
        const { navigation } = this.props;
        const { navigate } = navigation;
        const { currentStudent, setCurrentStudent } = this.props;
        const { getStudentList } = navigation.state.params;
        checkUser(() => {
            fetchData.postData('/editStudentName',
                {
                    newStudentName: name,
                    studentId: currentStudent.id
                }
            ).then((val) => {
                if(val.editStudentNameSuccess) {
                    Alert.alert(
                        'Alert',
                        '修改成功',
                        [
                            {text: 'OK',
                                onPress: () => {
                                    let newCurrentStudent = {...currentStudent, name: name};
                                    setCurrentStudent(newCurrentStudent);
                                    getStudentList();
                                    navigation.goBack();
                                }
                            },
                        ],
                        { cancelable: false }
                    );
                }
            });
        }, navigate);
    };
    removeStudentInClass = () => {
        const { navigate } = this.props.navigation;
        const { currentStudent } = this.props;
        const { handleStudentListModal, getStudentList } = this.props.navigation.state.params;
        checkUser(() => {
            fetchData.postData('/removeStudentInClass',
                {
                    studentId: currentStudent.id
                }
            ).then((val) => {
                if(val.removeStudentSuccess) {
                    Alert.alert(
                        'Alert',
                        '移除成功',
                        [
                            {text: 'OK', onPress: () =>  {
                                    getStudentList();
                                    handleStudentListModal(false);
                                    navigate('ClassDetailList')
                            }},
                        ],
                        { cancelable: false }
                    );
                }else {
                    alert('移除失败');
                }
            });
        }, navigate);
    };
    render() {
        const { navigation } = this.props;
        const { currentStudent } = navigation.state.params;
        return(
            <View>
                <PublicHeader
                    title="学生资料"
                    isLeft={true}
                    navigation={navigation}
                />
                <View style={styles.stuDetailInfoContainer}>
                    <Image
                        source={require('../../public/img/test.png')}
                        style={styles.stuDetailInfo}
                    />
                    <PublicHorizontalItem
                        toTargetFun={this.toEditStudentName}
                        leftText="学生姓名"
                        rightText={currentStudent.name}
                    />
                </View>
                <PublicBtn
                    tips="从班级中删除"
                    onPress={this.removeStudentInClass}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    stuDetailInfoContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20
    },
    stuDetailInfo: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
});

const mapStateToProps = (state) => {
    return {
        currentStudent: state.studentReducer.currentStudent
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentStudent: (currentStudent) => {
            dispatch(studentActions.setCurrentStudent(currentStudent));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentDetailInfo);