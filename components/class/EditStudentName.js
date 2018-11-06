import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";


class EditStudentName extends Component{
    constructor() {
        super();
        this.state = {
            studentName: '舒小台',
        }
    }
    componentDidMount() {
        let studentInput = this.studentInput;
        studentInput.focus();
    }
    getLeftComponent = () => (
        <Text style={{ color: '#fff' }}>取消</Text>
    );
    getRightComponent = () => (
        <Text style={{ color: '#fff' }}>保存</Text>
    );
    render() {
        const { navigation } = this.props;
        const { studentName } = this.state;
        return(
            <View>
                <PublicHeader
                    title="学生姓名"
                    isLeft={true}
                    leftComponent={this.getLeftComponent()}
                    navigation={navigation}
                    isRight={true}
                    rightComponent={this.getRightComponent()}
                />
                <TextInput
                    ref={(studentInput) => this.studentInput = studentInput}
                    style={styles.changeStuName}
                    onChangeText={(studentName) => this.setState({studentName})}
                    value={studentName}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    changeStuName: {
        height: 40,
        backgroundColor: '#fff',
        marginTop: 10,
        paddingLeft: 10
    }
});

export default EditStudentName;