import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';

const PublicImageItem = (props) => {
    const { data, changeCheckTips, rightName, checkItem, avatarMarginLeft, isShowCheckCount, selectRightName} = props;
    return(
        <View style={styles.checkListContainer}>
            {
                data.map((item) => (
                    <View style={styles.checkListItem} key={item.id}>
                        {
                            avatarMarginLeft ? ((item.id === 1 || item.id === 2 || item.id === 3) ?
                                <View style={styles.rateTips}>
                                    <Text>{item.id}</Text>
                                </View> : null) : null
                        }
                        <Image
                            source={require('../../public/img/test.png')}
                            style={[styles.stuAvatar, {marginLeft: avatarMarginLeft ? avatarMarginLeft : 20}]}
                        />
                        <Text>{item.name}</Text>
                        <TouchableOpacity
                            style={styles.checkTips}
                            onPress={changeCheckTips ? () => changeCheckTips(item) : null}
                        >
                            <Text>{rightName ? rightName : (isShowCheckCount ? `${selectRightName} ${item['state_count']} 次` : checkItem[item['checkTipsId']].name)}</Text>
                        </TouchableOpacity>
                    </View>
                ))
            }
        </View>
    );
};

const styles = StyleSheet.create({
    checkListContainer: {
        width: '100%',
        marginTop: 10
    },
    checkListItem: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 1
    },
    stuAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10
    },
    checkTips: {
        position: 'absolute',
        right: 20
    },
    rateTips: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'skyblue',
        alignItems: 'center',
        marginLeft: 15,
        position: 'absolute'
    }
});
export default PublicImageItem