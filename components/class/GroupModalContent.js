import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import listData from "../../public/mockData/listData";

let selectGroupListArr = [1, 2, 3];
class GroupModalContent extends Component{

    constructor() {
        super();
        this.state = {
            selectGroupList: selectGroupListArr
        }
    }
    selectGroupStudent = (key) => {
        let index = selectGroupListArr.indexOf(key);
        if (index === -1) {
            selectGroupListArr.push(key);
        } else {
            selectGroupListArr.splice(index, 1);
        }
        this.setState({
            selectGroupList: selectGroupListArr
        });
    };
    renderGroupStudentList = () => {
        const { selectGroupList } = this.state;
        return(
            <ScrollView
                contentContainerStyle={styles.remarkContainer}>
                {
                    listData.selectGroupStuList.map((item) => {
                        return(
                            <TouchableOpacity
                                style={styles.remarkItem}
                                key={item.key}
                                activeOpacity={0.8}
                                onPress={() => this.selectGroupStudent(item.key)}
                            >
                                <View style={styles.checkIcon}>
                                    <Icon
                                        name="check-circle"
                                        color={selectGroupList.indexOf(item.key) !== -1 ? '#3498db' : 'gray'}
                                        size={20}
                                    />
                                </View>
                                <Image
                                    source={require('../../public/img/test.png')}   //uri: item.avatarUrl
                                    style={styles.remarkImg}
                                />
                                <Text style={styles.remark}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        )
    };

    render() {
        const { handleModal } = this.props;
        return(
            <View style={{ flex: 1 }}>
                {this.renderGroupStudentList()}
                <TouchableOpacity
                    style={styles.remarkOnGroup}
                    activeOpacity={0.7}
                    onPress={() => handleModal(true)}
                >
                    <Text
                        style={styles.remarkOnGroupText}
                    >点评小组</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    stuAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    detailText: {
        fontSize: 12,
        marginTop: 7
    },
    remarkContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginLeft: 15,
    },
    remarkItem: {
        display: 'flex',
        width: 89,
        alignItems: 'center',
        marginBottom: 8
    },
    remarkImg: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    remark: {
        marginTop: 8
    },
    checkIcon: {
        position: 'relative',
        right: -23,
        top: 16,
        zIndex: 100,
    },
    remarkOnGroup: {
        height: 45,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center'
    },
    remarkOnGroupText: {
        color: '#fff'
    }
});

export default GroupModalContent;