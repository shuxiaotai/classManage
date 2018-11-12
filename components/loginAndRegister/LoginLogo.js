import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const LoginLogo = () => (
    <View style={styles.loginTop}>
        <Image
            source={require('../../public/img/test.png')}
            style={styles.loginImg}
        />
        <Text style={styles.loginText}>小学课堂管理</Text>
    </View>
);

const styles = StyleSheet.create({
    loginTop: {
        alignItems: 'center'
    },
    loginImg: {
        width: 90,
        height: 90,
        borderRadius: 45
    },
    loginText: {
        marginTop: 30
    }
});

export default LoginLogo;