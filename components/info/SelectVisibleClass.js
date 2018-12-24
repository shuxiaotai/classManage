import React, { Component } from 'react';
import {View, Text, StyleSheet, SectionList, TouchableOpacity, Image, Dimensions} from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import PublicMask from "../../public/components/PublicMask";
import { Icon } from 'react-native-elements';
import {checkUser, getTokenInfo} from "../../public/utils/checkUser";
import fetchData from "../../public/utils/fetchData";
import * as infoActions from './Actions/infoAction';
import { connect } from 'react-redux';
import getProtocol from "../../public/utils/getProtocol";
import {isIphoneX} from "../../public/utils/getDevice";
import PublicNoContent from "../../public/components/PublicNoContent";

class SelectVisibleClass extends Component{
    constructor() {
        super();
        this.state = {
            showVisibleClass: false,   //显示往下显示点击框
            postNotice: -1,  //-1的时候都没选，0是公告，1是作业，
            masterClassId: -1,  // 选择的创建班级id
            teacherClassIdArr: [],   //选择的管理班级ids
            isSelectAll: false   //是否全选
        }
    }
    componentDidMount(){
        this.fetchVisibleClass();
    }
    fetchVisibleClass = () => {
        const { navigate } = this.props.navigation;
        const { setMasterClassList, setTeacherClassList } = this.props;
        checkUser(() => {
            getTokenInfo().then((value) => {
                fetchData.postData('/visibleClassList',
                    {
                        teacherId: value.id,
                    }
                ).then((val) => {
                    setMasterClassList(val.classList.masterClassList);
                    setTeacherClassList(val.classList.teacherClassList);
                });
            });
        }, navigate);
    };
    getClassIds = (id) => {
        const { masterClassId } = this.state;
        if (masterClassId === id) {
            this.setState({
                masterClassId: -1
            });
        } else {
            this.setState({
                masterClassId: id
            });
        }
    };
    getTeacherClassIdArr = (id) => {
        const { teacherClassIdArr } = this.state;
        const { teacherClassList } = this.props;
        let index = teacherClassIdArr.indexOf(id);
        if (index === -1) {
            teacherClassIdArr.push(id);
        } else {
            teacherClassIdArr.splice(index, 1);
        }
        this.setState({
            teacherClassIdArr: teacherClassIdArr
        });
        if (teacherClassList.length === teacherClassIdArr.length) {
            this.setState({
                isSelectAll: true
            });
        }else {
            this.setState({
                isSelectAll: false
            });
        }
    };
    renderVisibleClassList = ({ item }) => {
        const { postNotice, masterClassId, teacherClassIdArr } = this.state;
        return(
            <TouchableOpacity
                style={styles.classItem}
                activeOpacity={postNotice === -1 ? 1 : 0.5}
                onPress={postNotice === 0 ? () => this.getClassIds(item.id) : () => this.getTeacherClassIdArr(item.id)}
            >
                {
                    item.isNotice === postNotice ?
                        <View style={styles.checkClass}>
                            <Icon
                                name="check-circle"
                                color={postNotice === 0 ? (item.id === masterClassId ? '#3498db': 'gray') : (teacherClassIdArr.indexOf(item.id) !== -1 ? '#3498db': 'gray')}
                            />
                        </View> : null
                }
                <Image
                    source={{uri: getProtocol() + item['img_url']}}
                    style={styles.userImg}
                />
                <Text>{item.grade}{item.name}</Text>
            </TouchableOpacity>
        )
    };
    handleShowVisibleClass = () => {
        this.setState({
            showVisibleClass: !this.state.showVisibleClass
        })
    };
    publishNotice = () => {   //点击发布公告的向下显示框
        this.setState({
            postNotice: 0,
            showVisibleClass: false,
            masterClassId: -1
        })
    };
    publishWork = () => {
        this.setState({
            postNotice: 1,
            showVisibleClass: false,
            teacherClassIdArr: []
        })
    };
    cancelSelect = () => {
        this.setState({
            postNotice: -1
        })
    };
    toPublishNoticeOrHomework = () => {
        const { postNotice, masterClassId, teacherClassIdArr } = this.state;
        const { navigate } = this.props.navigation;
        const { fetchAllInfoList } = this.props.navigation.state.params;
        if (postNotice === 0) {
            navigate('PublishNoticeOrHomeWork', {
                postNotice,
                masterClassId,
                fetchAllInfoList
            });
        }else {
            navigate('PublishNoticeOrHomeWork', {
                postNotice,
                teacherClassIdArr,
                fetchAllInfoList
            });
        }
    };
    selectAll = () => {
        const { isSelectAll } = this.state;
        this.setState({
            isSelectAll: !isSelectAll
        });
        if (!isSelectAll) {
            const { teacherClassList } = this.props;
            let selectAllIdArr = [];
            teacherClassList.forEach((item) => {
                selectAllIdArr.push(item.id);
            });
            this.setState({
                teacherClassIdArr: selectAllIdArr
            })
        } else {
            this.setState({
                teacherClassIdArr: []
            })
        }
    };
    render() {
        const { navigation, masterClassList, teacherClassList } = this.props;
        let newMasterClassList = [];
        masterClassList.forEach((item) => {
            let obj = {};
            obj.id = item.id;
            obj.name = item.name;   //头像后面做
            obj.grade = item.grade;
            obj.img_url = item['img_url'];
            obj.isNotice = 0;
            newMasterClassList.push(obj);
        });
        let newTeacherClassList = [];
        teacherClassList.forEach((item) => {
            let obj = {};
            obj.id = item.id;
            obj.name = item.name;   //头像后面做
            obj.grade = item.grade;
            obj.img_url = item['img_url'];
            obj.isNotice = 1;
            newTeacherClassList.push(obj);
        });
        const { showVisibleClass, postNotice, isSelectAll } = this.state;
        return(
            <View style={{ height: '100%', position: 'relative'}}>
                <PublicHeader
                    title="选择可见班级"
                    isLeft={true}
                    isRight={true}
                    navigation={navigation}
                    rightComponent={
                        (masterClassList.length === 0 && teacherClassList.length === 0) ? null :
                        (postNotice === -1 ?
                        <Icon
                            name="add"
                            color="#fff"
                        /> : <Text style={{ color: '#fff' }}>取消</Text>)
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
                {
                    (masterClassList.length === 0 && teacherClassList.length === 0) ?
                        <PublicNoContent tips="暂无可以发布的班级，请先创建"/>
                        :
                        <SectionList
                            ref={(sectionList) => this.sectionList = sectionList}
                            renderItem={({ item, index, section }) => this.renderVisibleClassList({ item, index, section })}
                            renderSectionHeader={({ section: { title } }) => (
                                <Text style={{ marginVertical: 10, marginLeft: 8, fontSize: 14 }}>{title}</Text>
                            )}
                            sections={[
                                { title: "创建的班级", data: newMasterClassList },
                                { title: "管理的班级", data: newTeacherClassList },
                            ]}
                            keyExtractor={(item, index) => item + index}
                        />

                }

                {
                    postNotice !== -1 ?
                        <View style={styles.assignContainer}>
                            {
                                postNotice === 1 ?
                                    <TouchableOpacity
                                        style={styles.selectAllContainer}
                                        onPress={this.selectAll}
                                    >
                                        <Icon
                                            name="check-circle"
                                            color={isSelectAll ? '#3498db' : 'gray'}
                                        />
                                        <Text style={{ marginLeft: 10 }}>全选</Text>
                                    </TouchableOpacity> : null
                            }
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
        bottom: isIphoneX() ? 7 : 0
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
        top: isIphoneX() ? 90 : 70,
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
const mapStateToProps = (state) => {
    return {
        masterClassList: state.infoReducer.masterClassList,
        teacherClassList: state.infoReducer.teacherClassList
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setMasterClassList: (masterClassList) => {
            dispatch(infoActions.setMasterClassList(masterClassList));
        },
        setTeacherClassList: (teacherClassList) => {
            dispatch(infoActions.setTeacherClassList(teacherClassList));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(SelectVisibleClass);