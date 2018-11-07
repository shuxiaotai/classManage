import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import PublicBtn from "../../public/components/PublicBtn";
import PublicHorizontalItem from "../../public/components/PublicHorizontalItem";
import EditOrCreateName from "./EditOrCreateName";

class StudentDetailInfo extends Component{

    toEditStudentName = () => {
        const { navigate } = this.props.navigation;
        navigate('EditOrCreateName', ({
            title : '学生姓名',
            leftText: '取消',
            rightText: '保存',
            leftName: '舒小台'
        }));
    };
    render() {
        const { navigation } = this.props;
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
                        rightText="舒小台"
                    />
                   <PublicBtn
                        tips="从班级中删除"
                   />
                </View>
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
export default StudentDetailInfo;