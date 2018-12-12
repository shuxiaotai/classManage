import React, { Component } from 'react';
import { Text, View, SectionList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import pinyinUtil from '../../public/utils/pinyinUtil';
import {checkUser, getTokenInfo} from "../../public/utils/checkUser";
import fetchData from "../../public/utils/fetchData";
import PublicNoContent from "../../public/components/PublicNoContent";

class addressBookScreen extends Component{
    constructor() {
        super();
        this.state = {
            sections: [],
            touchList: []
        }
    }

    componentDidMount() {
        this.fetchAddressBookList();
        const { navigation } = this.props;
        const { touchList } = this.state;
        navigation.setParams({
            onLetterSelect: this.onLetterSelect,
            fetchAddressBookList: this.fetchAddressBookList
        });
    }
    fetchAddressBookList = () => {
        const { navigation } = this.props;
        const { navigate } = navigation;
        checkUser(() => {
            getTokenInfo().then((value) => {
                fetchData.postData('/addressBookList',
                    {
                        teacherId: value.selectIdentity === 0 ? value.id : '',
                        selectIdentity: value.selectIdentity,
                        parentId: value.selectIdentity === 1 ? value.id : ''
                    }
                ).then((val) => {
                    this.getSections(val.addressBookList);
                });
            });
        }, navigate);
    };
    getSections = (addressBookList) => {
        addressBookList.sort((a, b) => {
            return pinyinUtil.getFirstLetter(a.username)[0].toLowerCase().charCodeAt(0) - pinyinUtil.getFirstLetter(b.username)[0].toLowerCase().charCodeAt(0)
        });
        let touchData = new Set();
        addressBookList.forEach((item) => {
            touchData.add(pinyinUtil.getFirstLetter(item.username)[0].toLowerCase());
        });
        touchData = [...touchData];
        let addressData = [];
        touchData.forEach((item) => {
            let obj = {};
            obj.title = item;
            obj.data = [];
            addressData.push(obj);
        });
        addressBookList.forEach((item) => {
            addressData.forEach((addressItem) => {
                if (addressItem.title === pinyinUtil.getFirstLetter(item.username)[0].toLowerCase()) {
                    addressItem.data.push(item);
                }
            })
        });
        this.setState({
            sections: addressData,
            touchList: touchData
        })
    };
    renderAddressBook = ({ item, index }) => {
        return(
            <TouchableOpacity style={styles.bookItem}>
                <Image
                    source={require('../../public/img/test.png')}
                    style={styles.userImg}
                />
                <Text style={styles.roleText}>{item['is_parent'] === 1 ? '家长': '老师'}</Text>
                <Text style={styles.phoneText}>{item.phone}</Text>
                <Text>{item.username}</Text>
            </TouchableOpacity>
        )
    };

    onLetterSelect = (key) => {
        const { touchList } = this.state;
        if (touchList.length > 0) {
            this.sectionList.scrollToLocation({sectionIndex: key, itemIndex: 0, viewOffset: 28});
        }
    };
    render() {
        const { sections, touchList } = this.state;
        return(
            <View>
                <PublicHeader title="通讯录" />
                {
                    touchList.length === 0 ?
                        <PublicNoContent tips="暂无通讯人员" />
                        :
                        <View>
                            <SectionList
                                ref={(sectionList) => this.sectionList = sectionList}
                                renderItem={({ item, index, section }) => this.renderAddressBook({ item, index, section })}
                                renderSectionHeader={({ section: { title } }) => (
                                    <Text style={{ marginVertical: 5, marginLeft: 8 }}>{title}</Text>
                                )}
                                sections={sections}
                                keyExtractor={(item, index) => item + index}
                            />
                            <View style={styles.letterContainer}>
                                {
                                    touchList.map((item, index) => {
                                        return(
                                            <TouchableOpacity
                                                onPress={() => this.onLetterSelect(index)}
                                                key={index}
                                            >
                                                <Text>{item}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        </View>
                }

            </View>
        );
    }
}
const styles = StyleSheet.create({
    letterContainer: {
        position: 'absolute',
        right: 5,
        top: 100
    },
    userImg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 15
    },
    bookItem: {
        height: 60,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 1
    },
    roleText: {
        fontSize: 12,
        color: 'gray',
    },
    phoneText: {
        marginHorizontal: 10
    }
});
export default addressBookScreen;