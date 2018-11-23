import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const PublicHorizontalItem = (props) => {
    const { toTargetFun, leftText, rightText, rightComponent, activeOpacity } = props;
    return(
        <TouchableOpacity
            style={styles.stuNameContainer}
            activeOpacity={activeOpacity ? activeOpacity : 0.5}
            onPress={toTargetFun}
        >
            <Text style={styles.leftText}>{leftText}</Text>
            <View style={styles.rightTextWrapper}>
                {
                    rightComponent ? rightComponent : <Text style={styles.rightText}>{rightText}</Text>
                }
                {
                    rightComponent ? null :
                        <Icon
                            name="chevron-right"
                            color="gray"
                        />
                }
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    stuNameContainer: {
        height: 40,
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15
    },
    leftText: {
        paddingLeft: 10
    },
    rightTextWrapper: {
        position: 'absolute',
        right: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightText: {
        color: 'gray'
    }
});
export default PublicHorizontalItem;