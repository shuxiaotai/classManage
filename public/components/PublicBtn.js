import React  from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const PublicBtn = (props) => (
    <TouchableOpacity
        style={styles.deleteStuBtn}
        activeOpacity={0.5}
    >
        <Text style={styles.btnText}>{props.tips}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    deleteStuBtn: {
        width: '90%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'skyblue',
        borderRadius: 5,
        marginTop: 25,
    },
    btnText: {
        color: '#fff'
    }
});
export default PublicBtn;