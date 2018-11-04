import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions} from 'react-native';
import { Icon } from 'react-native-elements';
import PublicTab from "../../public/components/PublicTab";

const tabItem = [
    {
        name: '表扬',
        key: 1,
    }, {
        name: '待改进',
        key: 2,
    }, {
        name: '自定义点评',
        key: 3,
    }
];
const list = [
    {
        title: '遵守纪律',
        key: '1'
    },
    {
        title: '遵守纪律',
        key: '2'
    },
    {
        title: '遵守纪律',
        key: '3'
    },
    {
        title: '遵守纪律',
        key: '4'
    },
    {
        title: '遵守纪律',
        key: '5'
    },
    {
        title: '遵守纪律',
        key: '6'
    },
    {
        title: '遵守纪律',
        key: '11'
    },
    {
        title: '遵守纪律',
        key: '21'
    },
    {
        title: '遵守纪律',
        key: '31'
    },
    {
        title: '遵守纪律',
        key: '41'
    },
    {
        title: '遵守纪律',
        key: '51'
    },
    {
        title: '遵守纪律',
        key: '61'
    }
];
const list1  = [
    {
        title: '遵守纪律',
        key: '61'
    }
];
class RemarkModalContent extends Component{
    constructor() {
        super();
        this.state = {
            selectKey: 1,
        }
    }

    onChangeSelectKey = (key) => {
        this.setState({
            selectKey: key
        })
    };
    renderRemarkList = ({ item }) => {
        return (
            <View style={styles.remarkItem}>
                <View style={styles.scoreView}>
                    <Text style={styles.scoreText}>+1</Text>
                </View>
                <Image
                    source={require('../../public/img/test.png')}   //uri: item.avatarUrl
                    style={styles.remarkImg}
                />
                <Text style={styles.remark}>
                    {item.title}
                </Text>
            </View>
        );
    };
    render() {
        const { selectKey } = this.state;
        return(
            <View
                style={{ flex: 1 }}
            >
                <View
                    style={styles.remarkHeader}
                    // onStartShouldSetResponderCapture={(evt) => true}   //在冒泡之前的捕获期会触发的方法，返回true来阻止这个View来响应
                >
                    <Text style={styles.headerLeft}>学生主页</Text>
                    <Text style={styles.remarkTitle}>点评朱叔叔</Text>
                    <TouchableOpacity style={styles.headerRight}>
                        <Icon
                            name={'close'}
                            color='gray'
                            size={19}
                        />
                    </TouchableOpacity>
                </View>
                <PublicTab tabItem={tabItem} selectKey={selectKey} onChangeSelectKey={this.onChangeSelectKey} />
                <View style={styles.remarkContainer}>
                    <FlatList
                        data={list}
                        renderItem={this.renderRemarkList}
                        numColumns={3}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    remarkHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 14,
        marginBottom: 10
    },
    headerLeft: {
        position: 'absolute',
        left: 10,
        color: '#0f7cda',
        fontSize: 13
    },
    remarkTitle: {
        fontSize: 15
    },
    headerRight: {
        position: 'absolute',
        right: 10
    },
    remarkContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginTop: 10,
        marginLeft: 30,
        flex: 1
    },
    remarkItem: {
        display: 'flex',
        width: 95,
        marginBottom: 10
    },
    remarkImg: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    remark: {
        marginTop: 8
    },
    scoreView: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#0f7cda',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: 15,
        right: -17,
        zIndex: 10
    },
    scoreText: {
        color: '#fff',
        fontSize: 13
    }
});
export default RemarkModalContent;