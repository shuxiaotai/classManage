import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import PublicHeader from "../../public/components/PublicHeader";
import EditStudentName from "./EditStudentName";

class StudentDetailInfo extends Component{

    toEditStudentName = () => {
        const { navigate } = this.props.navigation;
        navigate('EditStudentName');
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
                    <TouchableOpacity
                        style={styles.stuNameContainer}
                        activeOpacity={0.5}
                        onPress={this.toEditStudentName}
                    >
                        <Text style={styles.leftText}>学生姓名</Text>
                        <View style={styles.rightTextWrapper}>
                            <Text style={styles.rightText}>舒小台</Text>
                            <Icon
                                name="chevron-right"
                                color="gray"
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.deleteStuBtn}
                        activeOpacity={0.5}
                    >
                        <Text style={styles.btnText}>从班级中删除</Text>
                    </TouchableOpacity>
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
    stuNameContainer: {
        height: 40,
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15
    },
    leftText: {
        paddingLeft: 10
    },
    rightTextWrapper: {
        position: 'absolute',
        right: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightText: {
        color: 'gray'
    },
    deleteStuBtn: {
        width: '90%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'skyblue',
        borderRadius: 5,
        marginTop: 25
    },
    btnText: {
        color: '#fff'
    }
});
export default StudentDetailInfo;