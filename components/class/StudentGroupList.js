import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import PublicScrollView from "../../public/components/PublicScrollView";
import PublicNoContent from "../../public/components/PublicNoContent";

class StudentGroupList extends Component{

    toNextStep = (groupName) => {
        const { getGroupList } = this.props;
        if(groupName === '') {
            alert('小组名不能为空');
        }else {
            const { navigate } = this.props.navigation;
            navigate('GroupAddStudent', {
                groupName,
                getGroupList
            });
        }
    };
    toCreateGroup = () => {
        const { navigate } = this.props.navigation;
        const { studentList } = this.props;
        if (studentList.length === 0) {
            alert('当前班级暂无学生，请先添加学生');
        } else {
            navigate('EditOrCreateName', {
                title : '小组命名',
                leftText: '取消',
                rightText: '下一步',
                leftName: '',
                placeholder: '请输入小组名称(16字符内)',
                rightPressFun: this.toNextStep,
            })
        }
    };
    showStudentOfGroup = (item) => {
        const { handleModal, setCurrentGroup } = this.props;
        setCurrentGroup(item);
        handleModal(true);
    };
    getRenderStudentGroup = () => {
        const { groupList } = this.props;
        return(
            <View>
                {
                    groupList.map((item) => {
                        return(
                            <View style={styles.stuGroupItem} key={item.id}>
                                <View style={styles.stuGroupHeader}>
                                    <Text style={styles.stuGroupHeaderText}>{item.name}</Text>
                                </View>
                                <TouchableOpacity style={styles.stuGroupContentContainer} onPress={() => this.showStudentOfGroup(item)}>
                                    <Image
                                        source={require('../../public/img/test.png')}
                                        style={styles.stuGroupAvatar}
                                    />
                                    <View style={styles.groupScore}>
                                        <Text style={[styles.groupScoreText, styles.praise]}>
                                            表扬{item['praise_score']}分
                                        </Text>
                                        <Text style={styles.groupScoreText}>
                                            批评{Math.abs(item['criticize_score'])}分
                                        </Text>
                                    </View>
                                    <Text style={styles.groupNums}>{item['student_count']}人</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })
                }
                <TouchableOpacity
                    style={styles.addGroup}
                    onPress={this.toCreateGroup}
                >
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
        const { groupList, updateFun } = this.props;
        return(
            <View style={styles.stuGroupContainer}>
                {
                    groupList.length !== 0 ?
                        <PublicScrollView
                            renderView={this.getRenderStudentGroup()}
                            setMarginBottom={210}
                            updateFun={updateFun}
                        />
                        :
                        <View>
                            <TouchableOpacity
                                style={[styles.addGroup, styles.noGroup]}
                                onPress={this.toCreateGroup}
                            >
                                <Icon
                                    name="add"
                                    color="#00aced"
                                    size={34}
                                />
                                <Text style={styles.addGroupText}>
                                    添加小组
                                </Text>
                            </TouchableOpacity>
                            <PublicNoContent tips="暂无小组"/>
                        </View>
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
        paddingLeft: 17,
        width: '100%'
    },
    addGroupText: {
        marginLeft: 10
    },
    noGroup: {
        position: 'absolute',
        zIndex: 30
    }
});

export default StudentGroupList;