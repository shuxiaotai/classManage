import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView} from 'react-native';
import { Icon } from 'react-native-elements';
import PublicTab from "../../public/components/PublicTab";
import PublicScrollView from "../../public/components/PublicScrollView";
import listData from "../../public/mockData/listData";

const tabItem = [
    {
        name: '表扬',
        key: 1,
    }, {
        name: '待改进',
        key: 2,
    }, {
        name: '自定义点评',
        key: 3,
    }
];
class RemarkModalContent extends Component{
    constructor() {
        super();
        this.state = {
            selectKey: 1,
            showSelectCourse: false
        }
    }

    onChangeSelectKey = (key) => {
        this.setState({
            selectKey: key
        })
    };
    remarkTips = (isPraise) => {
        let tips = isPraise ? '表扬成功' : '批评成功';
        alert(tips);
    };
    renderRemarkList = (isPraise) => {
        let list = isPraise ? listData.remarkPraiseList : listData.remarkCriticizeList;
        return(
            <View style={styles.remarkContainer}>
                {
                    list.map((item) => {
                        return(
                            <TouchableOpacity
                                style={styles.remarkItem}
                                key={item.key}
                                onPress={() => this.remarkTips(isPraise)}
                            >
                                <View style={isPraise ? styles.scorePraiseView : styles.scoreCriticizeView}>
                                    <Text style={styles.scoreText}>{isPraise ? '+1' : '-1'}</Text>
                                </View>
                                <Image
                                    source={require('../../public/img/test.png')}   //uri: item.avatarUrl
                                    style={styles.remarkImg}
                                />
                                <Text style={styles.remark}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    };
    getCourse = (key) => {
        console.log(key);
        this.setState({
            showSelectCourse: false
        })
    };
    renderCourse = () => {
        return(
            <View style={styles.courseContainer}>
                {
                    listData.courseList.map((item) => {
                        return(
                            <TouchableOpacity
                                style={styles.courseItem}
                                key={item.key}
                                onPress={() => this.getCourse(item.key)}
                            >
                                <Image
                                    source={require('../../public/img/test.png')}   //uri: item.avatarUrl
                                    style={styles.remarkImg}
                                />
                                <Text style={styles.remark}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    };
    changeSelectedProject = () => {
        this.setState({
            showSelectCourse: true
        })
    };
    toStudentHomePage = () => {
        const { navigate } = this.props.navigation;
        navigate('StudentHomePage');
    };
    render() {
        const { selectKey, showSelectCourse } = this.state;
        const { handleModal } = this.props;
        return(
            <View style={{ flex: 1 }}>
                <View
                    style={styles.remarkHeader}
                    // onStartShouldSetResponderCapture={(evt) => true}   //在冒泡之前的捕获期会触发的方法，返回true来阻止这个View来响应
                >
                    <TouchableOpacity
                        style={styles.headerLeft}
                        onPress={this.toStudentHomePage}
                    >
                        <Text style={styles.headLeftText}>学生主页</Text>
                    </TouchableOpacity>
                    <Text style={styles.remarkTitle}>点评朱叔叔</Text>
                    <TouchableOpacity
                        style={styles.headerRight}
                        onPress={() => handleModal(false)}
                    >
                        <Icon
                            name={'close'}
                            color='gray'
                            size={19}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={this.changeSelectedProject}>
                    <Text style={styles.selectCourse}>选择课程</Text>
                </TouchableOpacity>
                <PublicTab tabItem={tabItem} selectKey={selectKey} onChangeSelectKey={this.onChangeSelectKey} />
                {
                    selectKey === 1 ?
                        ( showSelectCourse ?
                            <PublicScrollView
                                renderView={this.renderCourse()}
                                setMarginBottom={100}
                            /> :
                            <PublicScrollView
                                renderView={this.renderRemarkList(true)}
                                setMarginBottom={100}
                            />
                        )
                        : null
                }
                {
                    selectKey === 2 ?
                        ( showSelectCourse ?
                            <PublicScrollView
                                renderView={this.renderCourse()}
                                setMarginBottom={100}
                            /> :
                            <PublicScrollView
                                renderView={this.renderRemarkList(false)}
                                setMarginBottom={100}
                            />
                        )
                        : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    remarkHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 14,
        marginBottom: 10,
    },
    headerLeft: {
        position: 'absolute',
        left: 10,
    },
    headLeftText: {
        color: '#0f7cda',
        fontSize: 13
    },
    remarkTitle: {
        fontSize: 15
    },
    headerRight: {
        position: 'absolute',
        right: 10
    },
    remarkContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginLeft: 15,
        marginTop: 5,
        height: 500,
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
    scorePraiseView: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#0f7cda',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: 15,
        right: -20,
        zIndex: 10,
    },
    scoreText: {
        color: '#fff',
        fontSize: 13
    },
    modalContainer: {
        width: 300,
        height: 400,
        backgroundColor: '#fff',
        borderRadius: 10,
        zIndex: 100,
        position: 'absolute'
    },
    scoreCriticizeView: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'skyblue',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: 15,
        right: -20,
        zIndex: 10,
    },
    selectCourse: {
        color: '#0f7cda',
        alignSelf: 'center',
        marginTop: 2,
        marginBottom: 2
    },
    courseContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginLeft: 15,
        marginTop: 10,
        height: 340,
    },
    courseItem: {
        display: 'flex',
        width: 89,
        alignItems: 'center',
        marginBottom: 15
    }
});
export default RemarkModalContent;