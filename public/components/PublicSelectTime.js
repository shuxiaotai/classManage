import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import listData from "../mockData/listData";

class PublicSelectTime extends Component {
    render() {
        const { handleShowSelectTime, selectTimeName, showSelectTime, selectTimeKey, selectTimeFun, arrowRight, top, data, height } = this.props;
        return(
            <View style={styles.homePageTopItem}>
                <TouchableOpacity
                    style={[styles.homePageTopItem, styles.leftTopItem]}
                    onPress={handleShowSelectTime}
                    activeOpacity={1}
                >
                    <Text>
                        {selectTimeName}
                    </Text>
                    <View style={{ position: 'absolute', right: arrowRight ? arrowRight : 50 }}>
                        <Icon
                            name={showSelectTime ? 'expand-less' : 'expand-more'}   //expand-less, 'expand-more'
                        />
                    </View>
                </TouchableOpacity>
                <View style={showSelectTime ? [styles.selectContainer, {top: top ? top : 34, height: height ? height : 200}] : styles.selectHiddenContainer}>
                    {
                        (data ? data : listData.selectTimeList).map((item) => {
                            return(
                                <TouchableOpacity
                                    style={styles.selectItem}
                                    key={item.id}
                                    onPress={() => selectTimeFun(item.id, item.name)}
                                >
                                    <Text style={{ color: selectTimeKey === item.id ? '#0f7cda' : 'black' }}>{item.name}</Text>
                                </TouchableOpacity>
                            );
                        })
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    homePageTopItem: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    leftTopItem: {
        borderStyle: 'solid',
        borderRightWidth: 1,
        borderRightColor: 'gray',
    },
    selectContainer: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        position: 'absolute',
        zIndex: 100
    },
    selectHiddenContainer: {
        display: 'none'
    },
    selectItem: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA'
    },
});

export default PublicSelectTime;