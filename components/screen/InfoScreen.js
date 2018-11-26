import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import PublicHeader from "../../public/components/PublicHeader";
import PublicTab from "../../public/components/PublicTab";
import PublicNoContent from "../../public/components/PublicNoContent";
import listData from "../../public/mockData/listData";
import Rate from "../info/Rate";
import SelectVisibleClass from "../info/SelectVisibleClass";

const tabItem = [
    {
        name: '全部',
        key: 1,
    }, {
        name: '公告',
        key: 2,
    }, {
        name: '作业',
        key: 3,
    }, {
        name: '光荣榜',
        key: 4,
    }
];

class InfoScreen extends Component{
    constructor() {
        super();
        this.state = {
            selectKey: 1
        }
    }

    onChangeSelectKey = (key) => {
        this.setState({
            selectKey: key
        })
    };
    getRenderItem = () => {
        return({item}) => (
            <View style={styles.infoItem}>
                <View style={styles.infoHeader}>
                    <Image
                        // source={{uri: item.imgSrc}}
                        source={require('../../public/img/test.png')}
                        style={styles.infoImg}
                    />
                    <View style={styles.infoText}>
                        <Text>{item.name} | </Text>
                        <Text style={styles.teacher}>{(item.teacherType === 0) ? '班主任' : '任课老师'}</Text>
                    </View>
                    <Text>{item.time}</Text>
                </View>
                <View style={styles.title}>
                    <Icon
                        name={item.isNotication ? 'mail' : 'home'}
                        color='#00aced' />
                    <Text style={styles.titleText}>{item.title}</Text>
                </View>
                <Text numberOfLines={1}>{item.content}</Text>
            </View>
        );
    };
    toSelectVisibleClass = () => {
        const { navigate } = this.props.navigation;
        navigate('SelectVisibleClass');
    };
    render() {
        const { selectKey } = this.state;
        const { navigation } = this.props;
        return(
            <View style={styles.main}>
                <PublicHeader title="通知" />
                <PublicTab tabItem={tabItem} selectKey={selectKey} onChangeSelectKey={this.onChangeSelectKey} />
                <View style={styles.infoContainer}>
                    {selectKey === 1 ?
                        <FlatList
                            data={listData.listAll}
                            renderItem={this.getRenderItem()}
                            ListEmptyComponent={<PublicNoContent tips="暂无作业和公告"/>}
                        /> : null
                    }
                    {selectKey === 2 ?
                        <FlatList
                            data={listData.listNotication}
                            renderItem={this.getRenderItem()}
                            ListEmptyComponent={<PublicNoContent tips="暂无公告"/>}
                        /> : null
                    }
                    {selectKey === 3 ?
                        <FlatList
                            data={listData.listMessage}
                            renderItem={this.getRenderItem()}
                            ListEmptyComponent={<PublicNoContent tips="暂无作业"/>}
                        /> : null
                    }
                    {selectKey === 4 ?
                        <Rate
                            navigation={navigation}
                        />: null
                    }

                </View>
                {
                    (selectKey === 1 || selectKey === 2 || selectKey === 3 ?
                        <TouchableOpacity
                            style={styles.edit}
                            onPress={this.toSelectVisibleClass}
                        >
                            <Icon
                                name='edit'
                                color='#00aced'
                                size={25}
                            />
                        </TouchableOpacity> : null
                    )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        height: '100%',
    },
    edit: {
        position: 'absolute',
        bottom: 15,
        right: 15
    },
    infoContainer: {
        marginTop: 10
    },
    infoItem: {
        height: 150,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        padding: 15,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1'
    },
    infoHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoImg: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    infoText: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 10
    },
    teacher: {
        fontSize: 10,
        color: 'gray',
        marginRight: 10,
        alignSelf: 'center'
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    titleText: {
        marginLeft: 8
    }
});

export default InfoScreen;