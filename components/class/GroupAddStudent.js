import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Image, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import PublicHeader from "../../public/components/PublicHeader";
import { connect } from 'react-redux';
import fetchData from "../../public/utils/fetchData";
import {checkUser, getTokenInfo} from "../../public/utils/checkUser";

class GroupAddStudent extends Component{
    constructor() {
        super();
        this.state = {
            isSearching: false,
            studentName: '',
            selectStudentList: []
        }
    }
    selectStudent = (id) => {
        const { selectStudentList } = this.state;
        let index = selectStudentList.indexOf(id);
        if (index === -1) {
            selectStudentList.push(id);
        } else {
            selectStudentList.splice(index, 1);
        }
        this.setState({
            selectStudentList: selectStudentList
        });
    };
    getRenderSelectStudentList = () => (
        <ScrollView>
            {
                this.props.studentList.map((item) => (
                    <TouchableOpacity
                        style={styles.selectStuListItem}
                        key={item.id}
                        activeOpacity={0.7}
                        onPress={() => this.selectStudent(item.id)}
                    >
                        <Icon
                            name="check-circle"
                            color={this.state.selectStudentList.indexOf(item.id) !== -1 ? '#3498db' : 'gray'}
                        />
                        <Image
                            source={require('../../public/img/test.png')}
                            style={styles.stuAvatar}
                        />
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    );
    addGroupFun = () => {
        const { selectStudentList } = this.state;
        const { currentClassId, navigation } = this.props;
        const { groupName, getGroupList } = navigation.state.params;
        const { navigate } = navigation;
        checkUser(() => {
            getTokenInfo().then((value) => {
                fetchData.postData('/addGroup',
                    {
                        groupName: groupName,
                        classId: currentClassId,
                        teacherId: value.id,
                        studentIdArr: selectStudentList
                    }
                ).then((val) => {
                    if(val.addGroupSuccess) {
                        Alert.alert(
                            'Alert',
                            `添加小组成功`,
                            [
                                {text: 'OK', onPress: () => {
                                        getGroupList();
                                        navigate('ClassDetailList')
                                    }},
                            ],
                            { cancelable: false }
                        );
                    }else {
                        alert('添加小组失败');
                    }
                });
            });
        }, navigate);
    };
    render() {
        const { navigation } = this.props;
        const { studentName, isSearching, selectStudentList } = this.state;
        return(
            <View style={{ flex: 1 }}>
                <PublicHeader
                    title={`添加学生(${selectStudentList.length})`}
                    isLeft={true}
                    navigation={navigation}
                    isRight={true}
                    rightPressFun={this.addGroupFun}
                    rightComponent={<Text style={{ color: '#fff' }}>完成</Text>}
                />
                {/*<View>*/}
                    {/*<View style={styles.searchContainer}>*/}
                        {/*<View>*/}
                            {/*<Icon*/}
                                {/*name="search"*/}
                                {/*color="gray"*/}
                            {/*/>*/}
                        {/*</View>*/}
                        {/*<TextInput*/}
                            {/*placeholder="搜索学生"*/}
                            {/*onChangeText={(studentName) => {*/}
                                {/*this.setState({*/}
                                    {/*studentName: studentName,*/}
                                    {/*isSearching: true*/}
                                {/*})*/}
                            {/*}}*/}
                            {/*value={studentName}*/}
                        {/*/>*/}
                    {/*</View>*/}
                {/*</View>*/}
                {
                    (studentName === '') ? this.getRenderSelectStudentList() : <Text>暂无学生</Text>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchContainer: {
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10
    },
    selectStuListItem: {
        height: 55,
        backgroundColor: '#f1f1f1',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        marginBottom: 1
    },
    stuAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginHorizontal: 5
    }
});

const mapStateToProps = (state) => {
    return {
        studentList: state.studentReducer.studentList,
        currentClassId: state.classReducer.currentClassId
    }
};
export default connect(mapStateToProps, null)(GroupAddStudent);