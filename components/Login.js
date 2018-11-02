import React, { Component } from 'react';
import { Button } from 'react-native';

class Login extends Component{

    render() {
        console.log(this.props.navigation);
        return(
            <Button
                title="login"
                onPress={() => this.props.navigation.navigate('Class')}
            />
        );
    }
}
export default Login;