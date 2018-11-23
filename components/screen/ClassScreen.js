import React, { Component } from 'react';
import {Text, View, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import PublicHeader from "../../public/components/PublicHeader";
import PublicTab from "../../public/components/PublicTab";
import PublicNoContent from "../../public/components/PublicNoContent";
import listData from '../../public/mockData/listData';
import PublicRefreshList from "../../public/components/PublicRefreshList";
import PublicMask from "../../public/components/PublicMask";
import fetchData from "../../public/utils/fetchData";
import { checkUser, getTokenInfo } from '../../public/utils/checkUser';
import * as classActions from '../class/Actions/classAction';

const tabItem = [
    {
        name: '我是任课老师',
        key: 0,
    },
    {
        name: '我是班主任',
        key: 1,
    }
];

class ClassScreen extends Component{
    constructor() {
        super();
        this.state = {
            selectKey: 0,
            dataArr: [],
            showManageClassBtn: false,
            isDeleteClass: false,
            selectClassList: []
        }
    }
    componentDidMount() {
        //到时候在这边把老师和家长区分
        // console.log(new Date().toLocaleString());
        // console.log(+new Date());
        this.getClassList(0);
    }
    getClassList = (key) => {
        const { navigate } = this.props.navigation;
        const { setClassList } = this.props;
        checkUser(() => {
            getTokenInfo().then((value) => {
                fetchData.postData('/classList',
                    {
                        teacherId: value.id,
                        selectIdentity: value.selectIdentity,
                        isCreateByMe: key
                    }
                ).then((val) => {
                    setClassList(val.classList);
                });
            });
        }, navigate);
    };
    onChangeSelectKey = (key) => {
        this.setState({
            selectKey: key,
        });
        this.getClassList(key)
    };
    getClassDetail = (id, grade, name, isMaster) => {
        const { navigate } = this.props.navigation;
        const { setCurrentClassId } = this.props;
        navigate('ClassDetailList', { grade, name, isMaster });
        setCurrentClassId(id);
    };
    touchClass = (item) => {
        const { selectKey, isDeleteClass } = this.state;
        if(isDeleteClass) {
            this.selectClass(item.id);
        }else {
            this.getClassDetail(item.id, item.grade, item.name, selectKey)
        }
    };
    getRenderItem = () => {
        const { isDeleteClass, selectClassList } = this.state;
        return({item}) => (
            <TouchableOpacity
                onPress={() => this.touchClass(item)}
                activeOpacity={isDeleteClass ? 0.5 : 1}
            >
                <View style={styles.mainItem}>
                    {
                        isDeleteClass ?
                            <View style={styles.checkClass}>
                                <Icon
                                    name="check-circle"
                                    color={selectClassList.indexOf(item.id) !== -1 ? '#3498db': 'gray'}
                                />
                            </View> : null
                    }
                    <Image
                        source={require('../../public/img/test.png')}  //{uri: item.imgSrc}
                        style={styles.mainImg}
                    />
                    <View style={styles.mainText}>
                        <Text>{item.grade}{item.name}</Text>
                        <Text style={styles.stu}>{item['student_count']}个学生</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    //获取模拟数据
    getList = (page) => {
        switch (page) {
            case 1:
                this.setState({
                    dataArr: listData.classList1
                });
                break;
            case 2:
                this.setState({
                    dataArr: listData.classList1.concat(listData.classList2)
                });
                break;
            case 3:
                this.setState({
                    dataArr: listData.classList1.concat(listData.classList2.concat(listData.classList3))
                });
                break;

        }
    };
    getRightComponent = () => {
        const { isDeleteClass } = this.state;
        return(
            <View>
                {
                    !isDeleteClass ?
                        <Icon
                            name="add"
                            color="#fff"
                        /> :
                        <Text style={{ color: '#fff' }}>完成</Text>
                }
            </View>
        )
    };
    handleShowManageClass = () => {
        this.setState({
            showManageClassBtn: !this.state.showManageClassBtn
        })
    };
    toCreateClass = () => {
        const { navigate } = this.props.navigation;
        navigate('CreateClass');
    };
    toDeleteClass = () => {
        this.setState({
            showManageClassBtn: false,
            isDeleteClass: true
        })
    };
    selectClass = (id) => {
        const { selectClassList } = this.state;
        let index = selectClassList.indexOf(id);
        if (index === -1) {
            selectClassList.push(id);
        } else {
            selectClassList.splice(index, 1);
        }
        this.setState({
            selectClassList: selectClassList
        });
    };
    toPostDeleteClass = () => {
        //发请求
        this.setState({
            isDeleteClass: false,
            selectClassList: []
        })
    };
    render() {
        const { selectKey, dataArr, showManageClassBtn, isDeleteClass } = this.state;
        const { classList, navigation } = this.props;
        return(
            <View style={{ position: 'relative' }}>
                <PublicMask
                    isVisible={showManageClassBtn}
                    handleModal={this.handleShowManageClass}
                    width={'100%'}
                    height={Dimensions.get('window').height}
                    backgroundColor="rgba(0, 0, 0, 0.1)"
                />
                <PublicHeader
                    title="课堂"
                    isRight={true}
                    rightComponent={this.getRightComponent()}
                    navigation={navigation}
                    rightPressFun={isDeleteClass ? this.toPostDeleteClass : this.handleShowManageClass}
                />
                <View style={showManageClassBtn ? styles.manageClass : styles.hidden}>
                    <View style={styles.triangleView}>
                    </View>
                    <TouchableOpacity
                        style={styles.manageClassItem}
                        onPress={this.toCreateClass}
                    >
                        <Text>创建班级</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.manageClassItem}
                        onPress={this.toDeleteClass}
                    >
                        <Text>删除班级</Text>
                    </TouchableOpacity>
                </View>
                <PublicTab tabItem={tabItem} selectKey={selectKey} onChangeSelectKey={this.onChangeSelectKey} />
                {
                    selectKey === 1 ?
                    <View style={styles.main}>
                        <PublicRefreshList
                            getRenderItem={this.getRenderItem}
                            dataArr={classList}
                            getList={this.getList}
                            totalPage={1}
                            ListEmptyComponent={<PublicNoContent tips="暂无创建的班级" />}
                        />
                    </View> :
                    <View style={styles.main}>
                        <PublicRefreshList
                            getRenderItem={this.getRenderItem}
                            dataArr={classList}
                            getList={this.getList}
                            totalPage={1}
                            ListEmptyComponent={<PublicNoContent tips="暂无管理的班级" />}
                        />
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        marginTop: 8,
        height: '100%',
    },
    mainItem: {
        height: 70,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 15,
        paddingBottom: 10,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1'
    },
    mainImg: {
        width: 48,
        height: 48,
        borderRadius: 25
    },
    mainText: {
        marginLeft: 15,
    },
    stu: {
        fontSize: 11,
        marginTop: 5,
        color: 'gray'
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
    checkClass: {
        marginRight: 10
    }
});
const mapStateToProps = (state) => {
    return {
        classList: state.classReducer.classList,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setClassList: (classList) => {
            dispatch(classActions.setClassList(classList));
        },
        setCurrentClassId: (currentClassId) => {
            dispatch(classActions.setCurrentClassId(currentClassId));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ClassScreen);