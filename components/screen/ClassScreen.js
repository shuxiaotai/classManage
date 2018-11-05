import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, FlatList, TouchableWithoutFeedback, ScrollView } from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import PublicTab from "../../public/components/PublicTab";
import PublicNoContent from "../../public/components/PublicNoContent";
import listData from '../../public/mockData/listData';
import PublicRefreshList from "../../public/components/PublicRefreshList";


const tabItem = [
    {
        name: '我创建的班级',
        key: 1,
    }, {
        name: '我管理的班级',
        key: 2,
    }
];

let page = 1;
let totalPage = 3;
const list = [];

class ClassScreen extends Component{
    constructor() {
        super();
        this.state = {
            selectKey: 1,
            dataArr: []
        }
    }
    onChangeSelectKey = (key) => {
        this.setState({
            selectKey: key,
        })
    };
    getClassDetail = (classText) => {
        const { navigate } = this.props.navigation;
        navigate('ClassDetailList', { classText });
    };
    getRenderItem = () => {
        return({item}) => (
            <TouchableWithoutFeedback onPress={() => this.getClassDetail(item.classText)}>
                <View style={styles.mainItem}>
                    <Image
                        source={require('../../public/img/test.png')}  //{uri: item.imgSrc}
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
    //获取模拟数据
    getList = (page) => {
        switch (page) {
            case 1:
                this.setState({
                    dataArr: listData.classList1
                });
                break;
            case 2:
                this.setState({
                    dataArr: listData.classList1.concat(listData.classList2)
                });
                break;
            case 3:
                this.setState({
                    dataArr: listData.classList1.concat(listData.classList2.concat(listData.classList3))
                });
                break;

        }
    };
    render() {
        const { selectKey, dataArr } = this.state;
        return(
            <View>
                <PublicHeader title="课堂" />
                <PublicTab tabItem={tabItem} selectKey={selectKey} onChangeSelectKey={this.onChangeSelectKey} />
                {
                    selectKey === 1 ?
                    <View style={styles.main}>
                        <PublicRefreshList
                            getRenderItem={this.getRenderItem}
                            dataArr={dataArr}
                            getList={this.getList}
                            totalPage={totalPage}
                            ListEmptyComponent={<PublicNoContent tips="暂无创建的班级" />}
                        />
                    </View> :
                    <View style={styles.main}>
                        <PublicRefreshList
                            getRenderItem={this.getRenderItem}
                            dataArr={dataArr}
                            getList={this.getList}
                            totalPage={totalPage}
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
        marginTop: 8,
        height: '100%',
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