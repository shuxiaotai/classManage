import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import PublicHeader from "../../public/components/PublicHeader";
import PublicTab from "../../public/components/PublicTab";
import PublicNoContent from "../../public/components/PublicNoContent";

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

const listAll = [
    {
        key: '1',
        imgSrc: "https://facebook.github.io/react/logo-og.png",
        name: 'sxt',
        teacherType: 0,  //0为班主任，1为任课老师
        time: '2018-10-10 19:09',
        isNotication: true,
        title: '10.20的语文作业',
        content: '语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业'
    },
    {
        key: '2',
        imgSrc: "https://facebook.github.io/react/logo-og.png",
        name: 'sxt',
        teacherType: 1,
        time: '2018-10-10 19:09',
        isNotication: false,    //true为公告，false为作业
        title: '10.20的语文作业',
        content: '语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业'
    },
    {
        key: '3',
        imgSrc: "https://facebook.github.io/react/logo-og.png",
        name: 'sxt',
        teacherType: 1,
        time: '2018-10-10 19:09',
        isNotication: false,    //true为公告，false为作业
        title: '10.20的语文作业',
        content: '语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业'
    }
];
const listNotication = [
    {
        key: '1',
        imgSrc: "https://facebook.github.io/react/logo-og.png",
        name: 'sxt',
        teacherType: 0,  //0为班主任，1为任课老师
        time: '2018-10-10 19:09',
        isNotication: true,
        title: '10.20的语文作业',
        content: '语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业'
    },
];
const listMessage = [
    {
        key: '1',
        imgSrc: "https://facebook.github.io/react/logo-og.png",
        name: 'sxt',
        teacherType: 0,  //0为班主任，1为任课老师
        time: '2018-10-10 19:09',
        isNotication: false,
        title: '10.20的语文作业',
        content: '语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业'
    },
    {
        key: '2',
        imgSrc: "https://facebook.github.io/react/logo-og.png",
        name: 'sxt',
        teacherType: 0,  //0为班主任，1为任课老师
        time: '2018-10-10 19:09',
        isNotication: false,
        title: '10.20的语文作业',
        content: '语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业语文作业'
    },
];
const list = [];
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
                        source={{uri: item.imgSrc}}
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
    render() {
        const { selectKey } = this.state;
        return(
            <View style={styles.main}>
                <PublicHeader title="通知" />
                <PublicTab tabItem={tabItem} selectKey={selectKey} onChangeSelectKey={this.onChangeSelectKey} />
                <View style={styles.infoContainer}>
                    {selectKey === 1 ?
                        <FlatList
                            data={list}
                            renderItem={this.getRenderItem()}
                            ListEmptyComponent={<PublicNoContent tips="暂无作业和公告"/>}
                        /> : null
                    }
                    {selectKey === 2 ?
                        <FlatList
                            data={listNotication}
                            renderItem={this.getRenderItem()}
                            ListEmptyComponent={<PublicNoContent tips="暂无公告"/>}
                        /> : null
                    }
                    {selectKey === 3 ?
                        <FlatList
                            data={list}
                            renderItem={this.getRenderItem()}
                            ListEmptyComponent={<PublicNoContent tips="暂无作业"/>}
                        /> : null
                    }

                </View>
                <View style={styles.edit}>
                    <Icon
                        name='edit'
                        color='#00aced'
                        size={25}
                    />
                </View>
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