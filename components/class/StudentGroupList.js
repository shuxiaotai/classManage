import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import listData from "../../public/mockData/listData";
import PublicScrollView from "../../public/components/PublicScrollView";
import PublicNoContent from "../../public/components/PublicNoContent";

class StudentGroupList extends Component{
    getRenderStudentGroup = () => {
        return(
            <View>
                {
                    listData.studentGroupList.map((item) => {
                        return(
                            <View style={styles.stuGroupItem} key={item.key}>
                                <View style={styles.stuGroupHeader}>
                                    <Text style={styles.stuGroupHeaderText}>{item.groupName}</Text>
                                </View>
                                <View style={styles.stuGroupContentContainer}>
                                    <Image
                                        source={require('../../public/img/test.png')}
                                        style={styles.stuGroupAvatar}
                                    />
                                    <View style={styles.groupScore}>
                                        <Text style={[styles.groupScoreText, styles.praise]}>
                                            表扬{item.praiseScore}分
                                        </Text>
                                        <Text style={styles.groupScoreText}>
                                            批评{item.criticizeScore}分
                                        </Text>
                                    </View>
                                    <Text style={styles.groupNums}>{item.groupNum}人</Text>
                                </View>
                            </View>
                        );
                    })
                }
                <TouchableOpacity style={styles.addGroup}>
                    <Icon
                        name="add"
                        color="#00aced"
                        size={34}
                    />
                    <Text style={styles.addGroupText}>
                        添加小组
                    </Text>
                </TouchableOpacity>
            </View>
        )
    };
    render() {
        return(
            <View style={styles.stuGroupContainer}>
                {
                    listData.studentGroupList.length !== 0 ?
                        <PublicScrollView
                            renderView={this.getRenderStudentGroup()}
                            setMarginBottom={210}
                        />
                        : <PublicNoContent tips="暂无小组"/>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    stuGroupContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 10
    },
    stuGroupHeader: {
        height: 30,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
        justifyContent: 'center',
        paddingLeft: 10,
    },
    stuGroupHeaderText: {
        fontSize: 12,
        color: 'gray'
    },
    stuGroupItem: {
        backgroundColor: '#fff',
        marginBottom: 5
    },
    stuGroupAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    stuGroupContentContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 70,
        paddingLeft: 10
    },
    groupScore: {
        marginLeft: 10
    },
    groupScoreText: {
        fontSize: 13
    },
    praise: {
        marginBottom: 6
    },
    groupNums: {
        position: 'absolute',
        right: 20,
        fontSize: 12,
        color: 'gray'
    },
    addGroup: {
        height: 80,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 17
    },
    addGroupText: {
        marginLeft: 10
    }
});

export default StudentGroupList;