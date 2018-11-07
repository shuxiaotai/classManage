import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const PublicCircleItem = (props) => {
    const { item, pressFun, activeOpacity } = props;
    return(
        <TouchableOpacity
            style={styles.courseItem}
            onPress={pressFun ? () => pressFun(item.key) : null}
            activeOpacity={activeOpacity ? activeOpacity : 0.4}
        >
            <Image
                source={require('../../public/img/test.png')}   //uri: item.avatarUrl
                style={styles.courseImg}
            />
            <Text style={styles.remark}>
                {item.title}
            </Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    courseItem: {
        display: 'flex',
        width: 89,
        alignItems: 'center',
        marginBottom: 15
    },
    courseImg: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    remark: {
        marginTop: 8
    },
});

export default PublicCircleItem;