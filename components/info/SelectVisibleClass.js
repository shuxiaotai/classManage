import React, { Component } from 'react';
import {View, Text, StyleSheet, SectionList, TouchableOpacity, Image, Dimensions} from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import PublicMask from "../../public/components/PublicMask";
import { Icon } from 'react-native-elements';

class SelectVisibleClass extends Component{
    constructor() {
        super();
        this.state = {
            showVisibleClass: false,
            postNotice: -1,
            noticeId: -1,
            homeWordArr: []
        }
    }
    renderVisibleClassList = ({ item, index }) => {
        const { postNotice } = this.state;
        return(
            <TouchableOpacity style={styles.classItem}>
                {
                    item.isNotice === postNotice ?
                        <View style={styles.checkClass}>
                            <Icon
                                name="check-circle"
                                color={[].indexOf(item.id) !== -1 ? '#3498db': 'gray'}
                            />
                        </View> : null
                }
                <Image
                    source={require('../../public/img/test.png')}
                    style={styles.userImg}
                />
                <Text>{item.name}</Text>
            </TouchableOpacity>
        )
    };
    handleShowVisibleClass = () => {
        this.setState({
            showVisibleClass: !this.state.showVisibleClass
        })
    };
    publishNotice = () => {
        this.setState({
            postNotice: 0,
            showVisibleClass: false
        })
    };
    publishWork = () => {
        this.setState({
            postNotice: 1,
            showVisibleClass: false
        })
    };
    cancelSelect = () => {
        this.setState({
            postNotice: -1
        })
    };
    toPublishNoticeOrHomework = () => {
        const { navigate } = this.props.navigation;
        navigate('PublishNoticeOrHomeWork');
    };
    render() {
        const { navigation } = this.props;
        const { showVisibleClass, postNotice } = this.state;
        return(
            <View style={{ height: '100%', position: 'relative'}}>
                <PublicHeader
                    title="选择可见班级"
                    isLeft={true}
                    isRight={true}
                    navigation={navigation}
                    rightComponent={
                        postNotice === -1 ?
                        <Icon
                            name="add"
                            color="#fff"
                        /> : <Text style={{ color: '#fff' }}>取消</Text>
                    }
                    rightPressFun={postNotice === -1 ? this.handleShowVisibleClass : this.cancelSelect}
                />
                <PublicMask
                    isVisible={showVisibleClass}
                    handleModal={this.handleShowVisibleClass}
                    width={'100%'}
                    height={Dimensions.get('window').height}
                    backgroundColor="rgba(0, 0, 0, 0.1)"
                />
                <View style={showVisibleClass ? styles.manageClass : styles.hidden}>
                    <View style={styles.triangleView}>
                    </View>
                    <TouchableOpacity
                        style={styles.manageClassItem}
                        onPress={this.publishNotice}
                    >
                        <Text>发布公告</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.manageClassItem}
                        onPress={this.publishWork}
                    >
                        <Text>发布作业</Text>
                    </TouchableOpacity>
                </View>
                <SectionList
                    ref={(sectionList) => this.sectionList = sectionList}
                    renderItem={({ item, index, section }) => this.renderVisibleClassList({ item, index, section })}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={{ marginVertical: 10, marginLeft: 8, fontSize: 14 }}>{title}</Text>
                    )}
                    sections={[
                        { title: "创建的班级", data: [{isNotice: 0, name: 'item1'}] },
                        { title: "管理的班级", data: [{isNotice: 1, name: 'item3'}, {isNotice: 1, name: 'item4'}] },
                    ]}
                    keyExtractor={(item, index) => item + index}
                />
                {
                    postNotice !== -1 ?
                        <View style={styles.assignContainer}>
                            <TouchableOpacity style={styles.selectAllContainer}>
                                <Icon
                                    name="check-circle"
                                    color="gray"
                                />
                                <Text style={{ marginLeft: 10 }}>全选</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.assignBtn}
                                onPress={this.toPublishNoticeOrHomework}
                            >
                                <Text style={styles.assignBtnText}>发布{postNotice === 0 ? '公告' : '作业'}</Text>
                            </TouchableOpacity>
                        </View> : null
                }

            </View>
        );
    }
}
const styles = StyleSheet.create({
    userImg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 15
    },
    classItem: {
        height: 60,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 1
    },
    checkClass: {
        marginRight: 5,
        marginLeft: 10
    },
    assignContainer: {
        width: '100%',
        height: 45,
        flexDirection: 'row',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0
    },
    assignBtn: {
        width: 100,
        position: 'absolute',
        right: 0,
        height: '100%',
        backgroundColor: 'skyblue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    assignBtnText: {
        color: '#fff'
    },
    selectAllContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15
    },
    manageClass: {
        width: 150,
        height: 80,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        position: 'absolute',
        right: 5,
        top: 70,
        zIndex: 20
    },
    manageClassItem: {
        display: 'flex',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1'
    },
    triangleView: {
        width: 15,
        height: 15,
        backgroundColor: '#fff',
        position: 'absolute',
        right: 10,
        top: -5,
        transform: [{ rotate:'45deg' }],
    },
    hidden: {
        display: 'none'
    },
});
export default SelectVisibleClass;