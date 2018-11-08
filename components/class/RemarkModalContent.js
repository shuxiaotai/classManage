import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native';
import PublicTab from "../../public/components/PublicTab";
import PublicCircleItem from "../../public/components/PublicCircleItem";
import PublicScrollView from "../../public/components/PublicScrollView";
import listData from "../../public/mockData/listData";
import PublicBtn from "../../public/components/PublicBtn";

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
            selectKey: 3,
            showSelectCourse: true
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
                            <PublicCircleItem
                                item={item}
                                pressFun={this.getCourse}
                                key={item.key}
                            />
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
    render() {
        const { selectKey, showSelectCourse } = this.state;
        return(
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={this.changeSelectedProject}>
                    <Text style={styles.selectCourse}>选择课程</Text>
                </TouchableOpacity>
                <PublicTab tabItem={tabItem} selectKey={selectKey} onChangeSelectKey={this.onChangeSelectKey} />
                {
                    selectKey === 1 ?
                        ( showSelectCourse ?
                            <PublicScrollView
                                renderView={this.renderCourse()}
                                setMarginBottom={80}
                            /> :
                            <PublicScrollView
                                renderView={this.renderRemarkList(true)}
                                setMarginBottom={80}
                            />
                        )
                        : null
                }
                {
                    selectKey === 2 ?
                        ( showSelectCourse ?
                            <PublicScrollView
                                renderView={this.renderCourse()}
                                setMarginBottom={80}
                            /> :
                            <PublicScrollView
                                renderView={this.renderRemarkList(false)}
                                setMarginBottom={80}
                            />
                        )
                        : null
                }
                {
                    selectKey === 3 ?
                        <View>
                            <TextInput
                                placeholder="请输入您的点评"
                                style={styles.customInput}
                                multiline={true}
                            />
                            <View style={styles.btnWrapper}>
                                <PublicBtn tips="确认点评" />
                            </View>
                        </View>
                        : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    customInput: {
        height: 100,
        marginTop: 30,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#f1f1f1',
        marginHorizontal: 15
    },
    btnWrapper: {
        alignItems: 'center',
        marginTop: 10
    }
});
export default RemarkModalContent;