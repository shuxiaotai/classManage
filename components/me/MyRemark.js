import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, ScrollView } from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import getProtocol from "../../public/utils/getProtocol";
import {checkUser, getTokenInfo} from "../../public/utils/checkUser";
import fetchData from "../../public/utils/fetchData";
import moment from "moment/moment";
import PublicNoContent from "../../public/components/PublicNoContent";

class MyRemark extends Component{
    constructor() {
        super();
        this.state = {
            teacherRemarkList: []
        }
    }
    componentDidMount() {
        const { navigate } = this.props.navigation;
        checkUser(() => {
            getTokenInfo().then((value) => {
                fetchData.postData('/teacherRemark',
                    {
                        teacherId: value.id
                    }
                ).then((val) => {
                    this.setState({
                        teacherRemarkList: val.teacherRemarkList
                    })
                });
            });
        }, navigate);
    }
    render() {
        const { navigation } = this.props;
        const { teacherRemarkList } = this.state;
        return(
            <View>
                <PublicHeader
                    title="我的点评"
                    isLeft={true}
                    navigation={navigation}
                />
                <ScrollView>
                    {
                        teacherRemarkList.length !== 0 ? teacherRemarkList.map((item) => {
                            return(
                                <View style={styles.myRemarkItem} key={item.id}>
                                    <Image
                                        source={item['img_url'] ? {uri: getProtocol() + item['img_url']} : require('../../public/img/teacher.jpg')}
                                        style={styles.projectImg}
                                    />
                                    <View>
                                        <View style={styles.remarkTop}>
                                            <Text style={item['is_praise'] ? styles.score : ''}>{item['is_praise'] === '0' ? '+' : (item['is_praise'] === '1' ? '-' : '')}{item.score ? item.score : ''}{item.score ? '分' : ''}</Text>
                                            <Text>{item['is_praise'] === '0' ? '表扬' : (item['is_praise'] === '1' ? '批评' : '自定义点评') }给{item['student_name']}   {item['template_name'] ? '因为' : ''}{item['template_name']}</Text>
                                        </View>
                                        <View style={styles.remarkBottom}>
                                            <Text style={styles.bottomText}>{moment(item['create_time']).format('YYYY-MM-DD HH:mm:ss')}  发送给{item['group_name']}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        }) :
                            <PublicNoContent tips="暂无点评" />
                    }
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    projectImg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 10
    },
    remarkTop: {
        flexDirection: 'row',
    },
    remarkBottom: {
        flexDirection: 'row',
        marginTop: 5
    },
    myRemarkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 65,
        backgroundColor: '#fff',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1'
    },
    score: {
        color: '#3498db',
        marginRight: 10
    },
    bottomText: {
        color: 'gray',
        fontSize: 12
    }
});
export default MyRemark;