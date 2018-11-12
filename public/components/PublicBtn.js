import React  from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

const PublicBtn = (props) => (
    <View style={styles.btnContainer}>
        <TouchableOpacity
            style={styles.deleteStuBtn}
            activeOpacity={0.5}
            onPress={props.onPress ? props.onPress : null}
        >
            <Text style={styles.btnText}>{props.tips}</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    btnContainer: {
        display: 'flex',
        alignItems: 'center'
    },
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