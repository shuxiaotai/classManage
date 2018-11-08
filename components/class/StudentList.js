import React, { Component } from 'react';
import { Icon, Badge } from 'react-native-elements';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AddStudent from "./AddStudent";
import listData from "../../public/mockData/listData";
import PublicNoContent from "../../public/components/PublicNoContent";
import PublicScrollView from "../../public/components/PublicScrollView";
import PublicMask from "../../public/components/PublicMask";
import PublicModal from "../../public/components/PublicModal";


class StudentList extends Component{

    handleAddStu = () => {
        const { navigate } = this.props.navigation;
        navigate('AddStudent');
    };
    getRenderStudent = () => {
        const { handleModal } = this.props;
        return(
            <View>
                {
                    listData.studentList.length !== 0 ?
                        <View style={styles.detailContainer}>
                            <View style={styles.detailItem}>
                                <Image
                                    source={require('../../public/img/test.png')}
                                    style={styles.stuAvatar}
                                />
                                <Badge
                                    value={0}
                                    textStyle={{ color: 'orange', fontSize: 13 }}
                                    containerStyle={styles.badgeText}
                                />
                                <Text style={styles.detailText}>
                                    全班
                                </Text>
                            </View>
                            {
                                listData.studentList.map((item) => (
                                    <TouchableOpacity style={styles.detailItem} key={item.key} onPress={() => handleModal(true)}>
                                        <Image
                                            source={require('../../public/img/test.png')}   //uri: item.avatarUrl
                                            style={styles.stuAvatar}
                                        />
                                        <Badge
                                            value={item.score}
                                            textStyle={{ color: 'orange', fontSize: 13 }}
                                            containerStyle={styles.badgeText}
                                        />
                                        <Text style={styles.detailText}>
                                            {item.stuName}
                                        </Text>
                                    </TouchableOpacity>
                                ))
                            }
                            <View>
                                <TouchableOpacity onPress={this.handleAddStu} style={styles.detailItem}>
                                    <View
                                        style={[styles.stuAvatar, styles.addStu]}
                                    >
                                        <Icon
                                            name="add"
                                            color="#00aced"
                                            size={34}
                                        />
                                    </View>
                                    <Text style={styles.detailText}>
                                        添加学生
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        <PublicNoContent tips="暂无学生" />
                }
            </View>
        )
    };
    showRandom = () => {
        const { handleRandomModal } = this.props;
        handleRandomModal(true);
    };
    render() {
        return(
            <View style={{ height: '100%'}}>
                <PublicScrollView
                    renderView={this.getRenderStudent()}
                    setMarginBottom={250}
                />
                <View style={styles.bottomBtns}>
                    <TouchableOpacity style={[styles.bottomBtn]}>
                        <Icon
                            name='event-available'
                            color='#70768c'
                        />
                        <Text>考勤</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.bottomBtn]}
                        onPress={this.showRandom}
                    >
                        <Icon
                            name='repeat'
                            color='#70768c'
                        />
                        <Text>随机</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    detailContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginTop: 15,
        marginLeft: 6,
        paddingBottom: 10
    },
    stuAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    detailItem: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        width: 60
    },
    detailText: {
        fontSize: 12,
        marginTop: 7
    },
    addStu: {
        backgroundColor: '#f1f1f1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    badgeText: {
        width: 40,
        height: 20,
        position: 'relative',
        top: -7,
    },
    bottomBtns: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        position: 'absolute',
        paddingVertical: 10,
        bottom: 208
    },
    bottomBtn: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    showModalContainer: {
        display: 'flex',
        backgroundColor: 'skyblue',
        position: 'absolute',
        zIndex: 100
    },
});
export default StudentList;