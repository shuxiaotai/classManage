import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import getProtocol from "../utils/getProtocol";

const PublicCircleItem = (props) => {
    const { item, pressFun, activeOpacity, ImgWidth, ImgHeight, ImgRadius } = props;
    return(
        <TouchableOpacity
            style={styles.courseItem}
            onPress={pressFun ? () => pressFun(item.id) : null}
            activeOpacity={activeOpacity ? activeOpacity : 0.4}
        >
            <Image
                source={{uri: getProtocol() + (item['img_url'] ? item['img_url'] : item['avatar_url'])}}
                style={{
                    width: ImgWidth ? ImgWidth : 50,
                    height: ImgHeight ? ImgHeight : 50,
                    borderRadius: ImgRadius ? ImgRadius : 25
                }}
            />
            <Text style={styles.remark}>
                {item.name}
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
    remark: {
        marginTop: 8
    },
});

export default PublicCircleItem;