import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import PublicHorizontalItem from "../../public/components/PublicHorizontalItem";
import PublicBtn from "../../public/components/PublicBtn";

class CreateClass extends Component{
    constructor() {
        super();
        this.state = {
            classOfName: ''
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
        navigate('SelectGrade');
    };
    toHome = () => {
        const { navigate } = this.props.navigation;
        navigate('Home');
    };
    render() {
        return(
            <View>
                <PublicHeader
                    title="创建班级"
                />
                <PublicHorizontalItem
                    leftText="年级"
                    rightText="请选择"
                    toTargetFun={this.toSelectGrade}
                />
                <PublicHorizontalItem
                    leftText="班级"
                    rightText="请选择"
                    rightComponent={this.getRightComponent()}
                    activeOpacity={1}
                />
                <PublicHorizontalItem
                    leftText="导入点评"
                    rightText="请选择"
                />
                <PublicBtn
                    tips="创建"
                    onPress={this.toHome}
                />
            </View>
        )
    }
}

export default CreateClass;