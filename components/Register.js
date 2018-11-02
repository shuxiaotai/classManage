import React, { Component } from 'react';
import { Button } from 'react-native';

class Register extends Component{

    render() {
        return(
            <Button
                title="regiser"
                onPress={() => this.props.navigation.navigate('Class')}
            />
        );
    }
}
export default Register;