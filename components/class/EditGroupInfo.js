import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import PublicHorizontalItem from "../../public/components/PublicHorizontalItem";
import EditOrCreateName from "./EditOrCreateName";
import PublicCircleItem from "../../public/components/PublicCircleItem";
import listData from "../../public/mockData/listData";
import PublicBtn from "../../public/components/PublicBtn";
import { connect } from 'react-redux';
import fetchData from "../../public/utils/fetchData";
import {checkUser} from "../../public/utils/checkUser";
import * as groupActions from './Actions/groupAction';

class EditGroupInfo extends Component{

    toEditGroupName = () => {
        const { navigate } = this.props.navigation;
        const { currentGroup } = this.props;
        navigate('EditOrCreateName', {
            title : '小组名称',
            leftText: '取消',
            rightText: '保存',
            leftName: currentGroup.name,
            rightPressFun: this.saveEditGroupName
        })
    };
    saveEditGroupName = (name) => {
        const { navigation, currentGroup, setCurrentGroup } = this.props;
        const { navigate } = navigation;
        const { getGroupList } = navigation.state.params;
        checkUser(() => {
            fetchData.postData('/editGroupName',
                {
                    editGroupName: name,
                    groupId: currentGroup.id
                }
            ).then((val) => {
                if(val.editGroupNameSuccess) {
                    Alert.alert(
                        'Alert',
                        '修改小组成功',
                        [
                            {text: 'OK',
                                onPress: () => {
                                    getGroupList();
                                    let newCurrentGroup = {...currentGroup, name: name};
                                    setCurrentGroup(newCurrentGroup);
                                    navigation.goBack();
                                }
                            },
                        ],
                        { cancelable: false }
                    );
                }else {
                    alert('修改小组失败');
                }
            });
        }, navigate);
    };
    toGoBack = () => {
        const { navigation } = this.props;
        const { handleGroupListModal } = navigation.state.params;
        handleGroupListModal(false);
        navigation.goBack();
    };
    removeGroup = () => {
        const { navigation } = this.props;
        const { handleGroupListModal } = navigation.state.params;
        const { navigate } = navigation;
        const { currentGroup } = this.props;
        const { getGroupList } = navigation.state.params;
        checkUser(() => {
            fetchData.postData('/removeGroup',
                {
                    groupId: currentGroup.id
                }
            ).then((val) => {
                if(val.removeGroupSuccess) {
                    Alert.alert(
                        'Alert',
                        '解散小组成功',
                        [
                            {text: 'OK',
                                onPress: () => {
                                    getGroupList();
                                    navigation.goBack();
                                    handleGroupListModal(false);
                                }
                            },
                        ],
                        { cancelable: false }
                    );
                }else {
                    alert('解散小组失败');
                }
            });
        }, navigate);
    };
    render() {
        const { navigation, currentGroup, studentOfGroup } = this.props;
        return(
            <View>
                <PublicHeader
                    title="小组资料"
                    isLeft={true}
                    navigation={navigation}
                    leftPressFun={this.toGoBack}
                />
                <PublicHorizontalItem
                    toTargetFun={this.toEditGroupName}
                    leftText="小组名称"
                    rightText={currentGroup.name}
                />
                <TouchableOpacity
                    style={styles.allGroupStuContainer}
                    activeOpacity={0.7}
                >
                    <View style={styles.topContainer}>
                        <Text>全部小组学生</Text>
                        <Text style={styles.rightText}>{currentGroup['student_count']}人</Text>
                    </View>
                    <View style={styles.stuContainer}>
                        {
                            studentOfGroup.map((item) => {
                                return(
                                    <PublicCircleItem
                                        item={item}
                                        key={item.id}
                                        activeOpacity={1}
                                    />
                                )
                            })
                        }
                    </View>
                </TouchableOpacity>
                <PublicBtn
                    tips="解散小组"
                    onPress={this.removeGroup}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    totalContainer: {
        alignItems: 'center'
    },
    allGroupStuContainer: {
        backgroundColor: '#fff',
        marginTop: 10
    },
    topContainer: {
        display: 'flex',
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
    },
    stuContainer: {
        flexDirection: 'row',
        paddingLeft: 5
    },
    rightText: {
        position: 'absolute',
        right: 10,
        fontSize: 13,
        color: 'gray'
    }
});
const mapStateToProps = (state) => {
    return {
        currentGroup: state.groupReducer.currentGroup,
        studentOfGroup: state.groupReducer.studentOfGroup
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentGroup: (currentGroup) => {
            dispatch(groupActions.setCurrentGroup(currentGroup));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(EditGroupInfo);