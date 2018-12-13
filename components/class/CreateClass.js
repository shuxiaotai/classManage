import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
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
            gradeName: ''
        }
    }
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
        const { navigation } = this.props;
        const { navigate } = navigation;
        const { gradeName, classOfName } = this.state;
        const { getClassList } = navigation.state.params;
        checkUser(() => {
            getTokenInfo().then((value) => {
                fetchData.postData('/addClass',
                    {
                        teacherId: value.id,
                        name: classOfName,
                        grade: gradeName
                    }
                ).then((val) => {
                    if (val.addClassSuccess) {
                        getClassList(1);
                        navigate('Home');
                    }
                });
            });
        }, navigate);
    };
    toImportTemplate = () => {
        const { navigate } = this.props.navigation;
        const { setTemplateComplete } = this.props;
        navigate('ImportTemplate', {
            setTemplateComplete
        });
    };
    toImportProject = () => {
        const { navigate } = this.props.navigation;
        const { setProjectComplete } = this.props;
        navigate('ImportProject', {
            setProjectComplete
        });
    };
    render() {
        const { navigation, templateComplete, projectComplete } = this.props;
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
                    rightText={templateComplete ? '已选择' : '请选择'}
                    toTargetFun={this.toImportTemplate}
                />
                <PublicHorizontalItem
                    leftText="导入项目"
                    rightText={projectComplete ? '已选择' : '请选择'}
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
        templateComplete: state.classReducer.templateComplete,
        projectComplete: state.classReducer.projectComplete
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setTemplateComplete: (templateComplete) => {
            dispatch(classActions.setTemplateComplete(templateComplete));
        },
        setProjectComplete: (projectComplete) => {
            dispatch(classActions.setProjectComplete(projectComplete));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateClass);