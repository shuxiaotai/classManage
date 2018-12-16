import React, { Component } from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import {checkUser, getTokenInfo} from "../../public/utils/checkUser";
import fetchData from "../../public/utils/fetchData";
import getProtocol from "../../public/utils/getProtocol";
import PublicNoContent from "../../public/components/PublicNoContent";

class ParentJoinClassInfo extends Component{
    constructor(){
        super();
        this.state = {
            parentJoinClassInfo: [],
            selectIdentity: -1
        }
    }
    componentDidMount() {
        this.fetchParentJoinClassInfo();
    }
    fetchParentJoinClassInfo = () => {
        const { navigate } = this.props.navigation;
        checkUser(() => {
            getTokenInfo().then((value) => {
                fetchData.postData('/parentJoinClassInfo',
                    {
                        teacherId: value.selectIdentity === 0 ? value.id : '-1',
                        selectIdentity: value.selectIdentity,
                        parentId: value.selectIdentity === 1 ? value.id : '-1',
                    }
                ).then((val) => {
                    this.setState({
                        parentJoinClassInfo: val.parentJoinClassInfo,
                        selectIdentity: value.selectIdentity
                    })
                });
            });
        }, navigate);
    };
    allowParentJoinClass = (id) => {
        const { navigate } = this.props.navigation;
        checkUser(() => {
            fetchData.postData('/allowParentJoinClass',
                {
                    parentId: id
                }
            ).then((val) => {
                if(val.allowParentJoinClass) {
                    this.fetchParentJoinClassInfo()
                }
            });
        }, navigate);
    };
    render() {
        const { navigation } = this.props;
        const { parentJoinClassInfo, selectIdentity } = this.state;
        return(
            <View>
                <PublicHeader
                    title="验证消息"
                    navigation={navigation}
                    isLeft={true}
                />
                <View>
                    {
                        selectIdentity === 0 ?
                            (parentJoinClassInfo.length > 0 ?
                                parentJoinClassInfo.map((item) => {
                                    return(
                                        <View
                                            style={styles.parentJoinClassInfoItem}
                                            key={item.id}
                                        >
                                            <Image
                                                source={{uri: getProtocol() + item['img_url']}}
                                                style={styles.parentImg}
                                            />
                                            <View>
                                                <Text>{item.username}({item['student_name']})</Text>
                                                <Text style={styles.applyText}>申请加入{item['class_grade']}{item['class_name']}</Text>
                                            </View>
                                            {
                                                item['parent_in_class'] === '0' ?
                                                    <TouchableOpacity
                                                        style={styles.willAllowBtn}
                                                        onPress={() => this.allowParentJoinClass(item.id)}
                                                    >
                                                        <Text style={styles.willAllowText}>
                                                            通过
                                                        </Text>
                                                    </TouchableOpacity> :
                                                    <Text style={styles.allowText}>已通过</Text>
                                            }

                                        </View>
                                    )
                                }) : <PublicNoContent tips="暂无消息" />) :
                                (parentJoinClassInfo.length > 0 ? parentJoinClassInfo.map((item) => {
                                    return(
                                        <View
                                            style={styles.parentJoinClassInfoItem}
                                            key={item.id}
                                        >
                                            <Image
                                                source={{uri: getProtocol() + item['img_url']}}
                                                style={styles.parentImg}
                                            />
                                            <View>
                                                <Text>{item['class_grade']}{item['class_name']}</Text>
                                                <Text style={styles.applyText}>您申请加入该班级</Text>
                                            </View>
                                            {
                                                item['parent_in_class'] === '0' ?
                                                    <Text style={styles.allowText}>等待班主任通过</Text> :
                                                    <Text style={styles.allowText}>已通过</Text>
                                            }

                                        </View>
                                    )
                                }) : <PublicNoContent tips="暂无消息" />)
                    }
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    parentImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginHorizontal: 10
    },
    parentJoinClassInfoItem: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1'
    },
    applyText: {
        fontSize: 11,
        color: 'gray',
        marginTop: 5
    },
    allowText: {
        position: 'absolute',
        right: 15,
        fontSize: 12,
        color: 'gray'
    },
    willAllowBtn: {
        position: 'absolute',
        right: 15,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#3498db',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    willAllowText: {
        fontSize: 12,
        color: '#3498db'
    }
});
export default ParentJoinClassInfo;