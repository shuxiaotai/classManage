import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import PublicTab from "../../public/components/PublicTab";
import PublicNoContent from "../../public/components/PublicNoContent";


const tabItem = [
    {
        name: '我创建的班级',
        key: 1,
    }, {
        name: '我管理的班级',
        key: 2,
    }
];

const list1 = [
    {
        key: '1',
        classText: '一年级二班',
        stuText: '10个学生',
        imgSrc: 'https://facebook.github.io/react/logo-og.png'
    },
    {
        key: '2',
        classText: '五年级二班',
        stuText: '10个学生',
        imgSrc: 'https://facebook.github.io/react/logo-og.png'
    },
    {
        key: '3',
        classText: '三年级二班',
        stuText: '101个学生',
        imgSrc: 'https://facebook.github.io/react/logo-og.png'
    }
];
const list2 = [
    {
        key: '1',
        classText: '一年级二班',
        stuText: '10个学生',
        imgSrc: 'https://facebook.github.io/react/logo-og.png'
    }
];
const list = [];

class ClassScreen extends Component{
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
    getClassDetail = (classText) => {
        const { navigate } = this.props.navigation;
        navigate('ClassDetail', { classText });
    };
    getRenderItem = () => {
        return({item}) => (
            <TouchableWithoutFeedback onPress={() => this.getClassDetail(item.classText)}>
                <View style={styles.mainItem}>
                    <Image
                        source={{uri: item.imgSrc}}
                        style={styles.mainImg}
                    />
                    <View style={styles.mainText}>
                        <Text>{item.classText}</Text>
                        <Text style={styles.stu}>{item.stuText}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    };
    render() {
        const { selectKey } = this.state;
        return(
            <View>
                <PublicHeader title="课堂" />
                <PublicTab tabItem={tabItem} selectKey={selectKey} onChangeSelectKey={this.onChangeSelectKey} />
                {
                    selectKey === 1 ?
                    <View style={styles.main}>
                        <FlatList
                            data={list1}
                            renderItem={this.getRenderItem()}
                            ListEmptyComponent={<PublicNoContent tips="暂无创建的班级"/>}
                        />
                    </View> :
                    <View style={styles.main}>
                        <FlatList
                            data={list2}
                            renderItem={this.getRenderItem()}
                            ListEmptyComponent={<PublicNoContent tips="暂无管理的班级" />}
                        />
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        marginTop: 8
    },
    mainItem: {
        height: 70,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 15,
        paddingBottom: 10,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1'
    },
    mainImg: {
        width: 48,
        height: 48,
        borderRadius: 25
    },
    mainText: {
        marginLeft: 15,
    },
    stu: {
        fontSize: 11,
        marginTop: 5,
        color: 'gray'
    },
});
export default ClassScreen;