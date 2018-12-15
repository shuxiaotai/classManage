import React, { Component } from 'react';
import {View, Text, TextInput, Alert} from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import PublicHorizontalItem from "../../public/components/PublicHorizontalItem";
import PublicBtn from "../../public/components/PublicBtn";
import fetchData from "../../public/utils/fetchData";
import {checkUser, getTokenInfo} from "../../public/utils/checkUser";
import { connect } from 'react-redux';
import * as classActions from './Actions/classAction';

class CreateClass extends Component{
    constructor() {
        super();
        this.state = {
            classOfName: '',
            gradeName: '',
            //模板
            defaultPraiseList: [],
            defaultCriticizeList: [],
            //项目
            defaultScheduleList: [],
            defaultCourseList: [],
            isFresh: false
        }
    }
    componentDidMount() {
        this.fetchDefaultTemplate();
        this.fetchDefaultProject();
    }
    changeClassFresh = () => {
        this.setState({
            isFresh: !this.state.isFresh
        })
    };
    fetchDefaultTemplate = () => {
        const { navigate } = this.props.navigation;
        checkUser(() => {
            fetchData.postData('/defaultTemplateList').then((val) => {
                this.setState({
                    defaultPraiseList: val.defaultPraiseList,
                    defaultCriticizeList: val.defaultCriticizeList
                });
                this.getId(val.defaultPraiseList, 0);
                this.getId(val.defaultCriticizeList, 1);
            });
        }, navigate);
    };
    fetchDefaultProject() {
        const { navigate } = this.props.navigation;
        checkUser(() => {
            fetchData.postData('/defaultProjectList').then((val) => {
                this.setState({
                    defaultScheduleList: val.defaultScheduleList,
                    defaultCourseList: val.defaultCourseList
                });
                this.getId(val.defaultScheduleList, 2);
                this.getId(val.defaultCourseList, 3);
            });
        }, navigate);
    }
    getId = (list, value) => {
        const { setDefaultPraiseIds, setDefaultCriticizeIds, setDefaultScheduleIds, setDefaultCourseIds } = this.props;
        let arr = [];
        list.forEach((item) => {
            arr.push(item.id);
        });
        if (value === 0) {
            setDefaultPraiseIds(arr);
        } else if (value === 1) {
            setDefaultCriticizeIds(arr);
        } else if (value === 2){
            setDefaultScheduleIds(arr);
        } else if (value === 3) {
            setDefaultCourseIds(arr);
        }
    };
    changeSelectIds = (id, selectList, selectKey) => {
        const { setDefaultPraiseIds, setDefaultCriticizeIds, setDefaultScheduleIds, setDefaultCourseIds } = this.props;
        let index = selectList.indexOf(id);
        if (index === -1) {
            selectList.push(id);
        } else {
            selectList.splice(index, 1);
        }
        if (selectKey === 0) {
            setDefaultPraiseIds(selectList);
        } else if (selectKey === 1) {
            setDefaultCriticizeIds(selectList);
        } else if (selectKey === 2){
            setDefaultScheduleIds(selectList);
        } else if (selectKey === 3) {
            setDefaultCourseIds(selectList);
        }
    };
    getRightComponent = () => {
        return(
            <TextInput
                style={{ width: 200, textAlign: 'right', marginRight: 10 }}
                placeholder="16字符内"
                onChangeText={(classOfName) => this.setState({classOfName})}
            />
        )
    };
    toSelectGrade = () => {
        const { navigate } = this.props.navigation;
        navigate('SelectGrade', {
            getGradeName: this.getGradeName
        });
    };
    getGradeName = (gradeName) => {
        this.setState({
            gradeName
        })
    };
    toAddClass = () => {
        const { navigation, defaultPraiseIds, defaultCriticizeIds, defaultScheduleIds, defaultCourseIds } = this.props;
        const { navigate } = navigation;
        const { gradeName, classOfName } = this.state;
        const { getClassList } = navigation.state.params;
        if (gradeName === '') {
            alert('年级不能为空');
        }else if (classOfName === '') {
            alert('班级不能为空');
        }else {
            checkUser(() => {
                getTokenInfo().then((value) => {
                    fetchData.postData('/addClass',
                        {
                            teacherId: value.id,
                            name: classOfName,
                            grade: gradeName,
                            praiseIds: defaultPraiseIds,
                            criticizeIds: defaultCriticizeIds,
                            scheduleIds: defaultScheduleIds,
                            courseIds: defaultCourseIds
                        }
                    ).then((val) => {
                        if (val.addClassSuccess) {
                            Alert.alert(
                                'Alert',
                                '创建班级成功',
                                [
                                    {text: 'OK', onPress: () => {
                                            getClassList(1);
                                            navigate('Home');
                                        }},
                                ],
                                { cancelable: false }
                            );
                        }
                    });
                });
            }, navigate);
        }
    };
    toImportTemplate = () => {
        const { navigate } = this.props.navigation;
        const { defaultPraiseList, defaultCriticizeList } = this.state;
        navigate('ImportTemplate', {
            defaultPraiseList: defaultPraiseList,
            defaultCriticizeList: defaultCriticizeList,
            changeSelectIds: this.changeSelectIds,
            changeClassFresh: this.changeClassFresh
        });
    };
    toImportProject = () => {
        const { navigate } = this.props.navigation;
        const { defaultScheduleList, defaultCourseList} = this.state;
        navigate('ImportProject', {
            defaultScheduleList: defaultScheduleList,
            defaultCourseList: defaultCourseList,
            changeSelectIds: this.changeSelectIds,
            changeClassFresh: this.changeClassFresh
        });
    };
    render() {
        const { navigation, defaultPraiseIds, defaultCriticizeIds, defaultScheduleIds, defaultCourseIds } = this.props;
        const { gradeName } = this.state;
        return(
            <View>
                <PublicHeader
                    title="创建班级"
                    isLeft={true}
                    navigation={navigation}
                />
                <PublicHorizontalItem
                    leftText="年级"
                    rightText={gradeName === '' ? '请选择' : gradeName}
                    toTargetFun={this.toSelectGrade}
                />
                <PublicHorizontalItem
                    leftText="班级"
                    rightComponent={this.getRightComponent()}
                    activeOpacity={1}
                    autoCapitalize="none"
                />
                <PublicHorizontalItem
                    leftText="导入点评"
                    rightText={(defaultPraiseIds.length !== 0 || defaultCriticizeIds.length !== 0) ? '已选择' : '请选择'}
                    toTargetFun={this.toImportTemplate}
                />
                <PublicHorizontalItem
                    leftText="导入项目"
                    rightText={(defaultScheduleIds.length !== 0 || defaultCourseIds.length !== 0)? '已选择' : '请选择'}
                    toTargetFun={this.toImportProject}
                />
                <PublicBtn
                    tips="创建"
                    onPress={this.toAddClass}
                />
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        defaultPraiseIds: state.classReducer.defaultPraiseIds,
        defaultCriticizeIds: state.classReducer.defaultCriticizeIds,
        defaultScheduleIds: state.classReducer.defaultScheduleIds,
        defaultCourseIds: state.classReducer.defaultCourseIds,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setDefaultPraiseIds: (defaultPraiseIds) => {
            dispatch(classActions.setDefaultPraiseIds(defaultPraiseIds));
        },
        setDefaultCriticizeIds: (defaultCriticizeIds) => {
            dispatch(classActions.setDefaultCriticizeIds(defaultCriticizeIds));
        },
        setDefaultScheduleIds: (defaultScheduleIds) => {
            dispatch(classActions.setDefaultScheduleIds(defaultScheduleIds));
        },
        setDefaultCourseIds: (defaultCourseIds) => {
            dispatch(classActions.setDefaultCourseIds(defaultCourseIds));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateClass);