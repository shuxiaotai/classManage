import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";


class EditOrCreateName extends Component{

    constructor(props) {
        super(props);
        this.state = {
            LeftName: props.navigation.state.params.leftName,
        }
    }
    componentDidMount() {
        let studentInput = this.studentInput;
        studentInput.focus();
    }
    getComponent = (isLeft) => {
        const { leftText, rightText } = this.props.navigation.state.params;
        return (
            <Text style={{ color: '#fff' }}>{isLeft ? leftText : rightText}</Text>
        );
    };
    render() {
        const { navigation } = this.props;
        const { title, placeholder, rightPressFun } = navigation.state.params;
        const { LeftName } = this.state;
        return(
            <View>
                <PublicHeader
                    title={title}
                    isLeft={true}
                    leftComponent={this.getComponent(true)}
                    navigation={navigation}
                    isRight={true}
                    rightComponent={this.getComponent(false)}
                    rightPressFun={rightPressFun ? () => rightPressFun(LeftName) : null}
                />
                <TextInput
                    ref={(studentInput) => this.studentInput = studentInput}
                    style={styles.changeStuName}
                    onChangeText={(LeftName) => this.setState({LeftName})}
                    placeholder={placeholder ? placeholder : ''}
                    value={LeftName}
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

export default EditOrCreateName;