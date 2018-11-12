import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import PublicHorizontalItem from "../../public/components/PublicHorizontalItem";
import EditOrCreateName from "./EditOrCreateName";
import PublicCircleItem from "../../public/components/PublicCircleItem";
import listData from "../../public/mockData/listData";
import PublicBtn from "../../public/components/PublicBtn";

class EditGroupInfo extends Component{

    toEditGroupName = () => {
        const { navigate } = this.props.navigation;
        navigate('EditOrCreateName', {
            title : '小组名称',
            leftText: '取消',
            rightText: '保存',
            leftName: '第一小组',
        })
    };
    render() {
        const { navigation } = this.props;
        return(
            <View>
                <PublicHeader
                    title="小组资料"
                    isLeft={true}
                    navigation={navigation}
                />
                <PublicHorizontalItem
                    toTargetFun={this.toEditGroupName}
                    leftText="小组名称"
                    rightText="第一小组"
                />
                <TouchableOpacity
                    style={styles.allGroupStuContainer}
                    activeOpacity={0.7}
                >
                    <View style={styles.topContainer}>
                        <Text>全部小组学生</Text>
                        <Text style={styles.rightText}>30人</Text>
                    </View>
                    <View style={styles.stuContainer}>
                        {
                            listData.courseList.map((item) => {
                                return(
                                    <PublicCircleItem
                                        item={item}
                                        key={item.key}
                                        activeOpacity={1}
                                    />
                                )
                            })
                        }
                    </View>
                </TouchableOpacity>
                <PublicBtn
                    tips="解散小组"
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
export default EditGroupInfo;