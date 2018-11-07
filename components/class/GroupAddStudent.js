import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import PublicHeader from "../../public/components/PublicHeader";
import listData from "../../public/mockData/listData";



let selectStudentArr = [];
class GroupAddStudent extends Component{
    constructor() {
        super();
        this.state = {
            isSearching: false,
            studentName: '',
            selectStudentList: selectStudentArr
        }
    }
    selectStudent = (key) => {
        let index = selectStudentArr.indexOf(key);
        if (index === -1) {
            selectStudentArr.push(key);
        } else {
            selectStudentArr.splice(index, 1);
        }
        this.setState({
            selectStudentList: selectStudentArr
        });
    };
    getRenderSelectStudentList = () => (
        <View>
            {
                listData.selectStudentList.map((item) => (
                    <TouchableOpacity
                        style={styles.selectStuListItem}
                        key={item.key}
                        activeOpacity={0.7}
                        onPress={() => this.selectStudent(item.key)}
                    >
                        <Icon
                            name="check-circle"
                            color={this.state.selectStudentList.indexOf(item.key) !== -1 ? '#3498db' : 'gray'}
                        />
                        <Image
                            source={require('../../public/img/test.png')}
                            style={styles.stuAvatar}
                        />
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
    render() {
        const { navigation } = this.props;
        const { studentName, isSearching } = this.state;
        return(
            <View>
                <PublicHeader
                    title="添加学生(小组)"
                    isLeft={true}
                    navigation={navigation}
                    isRight={true}
                    rightComponent={<Text style={{ color: '#fff' }}>完成</Text>}
                />
                <View>
                    <View style={styles.searchContainer}>
                        <View>
                            <Icon
                                name="search"
                                color="gray"
                            />
                        </View>
                        <TextInput
                            placeholder="搜索学生"
                            onChangeText={(studentName) => {
                                this.setState({
                                    studentName: studentName,
                                    isSearching: true
                                })
                            }}
                            value={studentName}
                        />
                    </View>
                </View>
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

export default GroupAddStudent;