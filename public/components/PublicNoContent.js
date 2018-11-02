import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';

const PublicNoContent = (props) => {
    return(
        <View style={styles.noContentContainer}>
            <Image
                source={require('../../public/img/no-content.png')}
                style={styles.noContent}
            />
            <Text style={styles.tips}>{props.tips}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    noContentContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 400
    },
    noContent: {
        width: 80,
        height: 80
    },
    tips: {
        marginTop: 10,
        color: 'gray'
    }
});

export default PublicNoContent;