import React, { Component } from 'react';
import { Icon, Badge } from 'react-native-elements';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import AddStudent from "./AddStudent";
import PublicNoContent from "../../public/components/PublicNoContent";
import PublicScrollView from "../../public/components/PublicScrollView";
import getProtocol from "../../public/utils/getProtocol";
import {isIphoneX, isIphonePlus} from '../../public/utils/getDevice';
import {getLocalImgIndex} from "../../public/utils/getLocalImg";

class StudentList extends Component{

    handleAddStu = () => {
        const { navigate } = this.props.navigation;
        const { getStudentList } = this.props;
        navigate('AddStudent', {getStudentList});
    };
    getStudentDetail = (item) => {
        const { handleModal, setCurrentStudent } = this.props;
        handleModal(true);
        setCurrentStudent(item);
    };
    getTotalScore = () => {
        const { studentList } = this.props;
        let totalScore = 0;
        if (studentList.length > 0) {
            studentList.forEach((item) => {
                totalScore += item.score;
            });
        }
        return totalScore;
    };
    getRenderStudent = () => {
        const { studentList, isMaster, imgUrl } = this.props;
        return(
            <View>
                {
                    studentList.length !== 0 ?
                        <View style={{ display: 'flex', alignItems: 'center'}}>
                            <View style={styles.detailContainer}>
                                <View style={styles.detailItem}>
                                    <Image
                                        source={{uri: getProtocol() + imgUrl}}
                                        style={styles.stuAvatar}
                                    />
                                    <Badge
                                        value={this.getTotalScore()}    //分数下次再算
                                        textStyle={{ color: '#c1194e', fontSize: 13 }}
                                        containerStyle={styles.badgeText}
                                    />
                                    <Text style={styles.detailText}>
                                        全班
                                    </Text>
                                </View>
                                {
                                    studentList.map((item) => (
                                        <TouchableOpacity
                                            style={styles.detailItem}
                                            key={item.id}
                                            onPress={() => this.getStudentDetail(item)}
                                        >
                                            <Image
                                                source={getLocalImgIndex('student', item['avatar_url'])}
                                                style={styles.stuAvatar}
                                            />
                                            <Badge
                                                value={item.score}
                                                textStyle={{ color: '#c1194e', fontSize: 13 }}
                                                containerStyle={styles.badgeText}
                                            />
                                            <Text style={styles.detailText} numberOfLines={1}>
                                                {item.name}
                                            </Text>
                                        </TouchableOpacity>
                                    ))
                                }
                                <View>
                                    {   //班主任才可以添加学生
                                        isMaster === 1 ?
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
                                            </TouchableOpacity> : null
                                    }
                                </View>
                            </View>
                        </View>
                        :
                        <View>
                            {
                                isMaster === 1 ?
                                    <View style={[styles.detailContainer, styles.noStudent]}>
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
                                    </View> : null
                            }
                            <PublicNoContent tips="暂无学生" />
                        </View>
                }
            </View>
        )
    };
    showRandom = () => {
        const { handleRandomModal } = this.props;
        handleRandomModal(true);
    };
    render() {
        const { isMaster, studentList, updateFun } = this.props;
        return(
            <View style={{ height: '100%' }}>
                <PublicScrollView
                    renderView={this.getRenderStudent()}
                    setMarginBottom={250}
                    updateFun={updateFun}
                />
                {
                    studentList.length === 0 ? null :
                        (isMaster === 0 ?
                            <View style={styles.bottomBtns}>
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
                            </View> : null
                        )
                }

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
        marginLeft: isIphonePlus() ? 0 : 10,
        paddingLeft: isIphonePlus() ? 14 : 0,
        paddingBottom: 10,
        width: '100%',
    },
    stuAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    detailItem: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: isIphonePlus() ? 18 : 15,
        marginRight: isIphonePlus() ? 18 : 15,
        marginBottom: 10,
        maxWidth: 60
    },
    detailText: {
        fontSize: 12,
        marginTop: 7,
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
        backgroundColor: '#4db4e7'
    },
    bottomBtns: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        position: 'absolute',
        paddingVertical: 10,
        bottom: isIphoneX() ? 300 : 208
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
    noStudent: {
        position: 'absolute',
        zIndex: 30
    }
});
export default StudentList;