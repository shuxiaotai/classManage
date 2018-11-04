import React, { Component } from 'react';
import { Icon, Badge } from 'react-native-elements';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import AddStudent from "./AddStudent";
import PublicModal from "../../public/components/PublicModal";
import RemarkModalContent from "./RemarkModalContent";
import listData from "../../public/mockData/listData";


class StudentList extends Component{
    constructor() {
        super();
        this.state = {
            isVisible: false,
            isHeaderRefreshing: false
        }
    }
    handleAddStu = () => {
        const { navigate } = this.props.navigation;
        navigate('AddStudent');
    };
    handleModal = () => {
        this.setState({
            isVisible: !this.state.isVisible
        })
    };
    headerRefreshing = () => {
        this.setState({
            isHeaderRefreshing: true
        });
        setTimeout(() => {
            alert('刷新成功');
            this.setState({
                isHeaderRefreshing: false
            });
        }, 1000)
    };
    render() {
        const { isVisible, isHeaderRefreshing } = this.state;
        return(
            <View style={{ marginBottom: 310 }}>
                <ScrollView
                    horizontal={false}
                    contentContainerStyle={[styles.detailContainer]}
                    refreshControl={
                        <RefreshControl
                            refreshing={isHeaderRefreshing}
                            onRefresh={() => this.headerRefreshing()}
                        />
                    }
                >
                    <View style={styles.detailItem}>
                        <Image
                            source={require('../../public/img/test.png')}
                            style={styles.stuAvatar}
                        />
                        <Badge
                            value={0}
                            textStyle={{ color: 'orange', fontSize: 13 }}
                            containerStyle={styles.badgeText}
                        />
                        <Text style={styles.detailText}>
                            全班
                        </Text>
                    </View>
                    {
                        listData.studentList.map((item) => (
                            <TouchableOpacity style={styles.detailItem} key={item.key} onPress={this.handleModal}>
                                <Image
                                    source={require('../../public/img/test.png')}   //uri: item.avatarUrl
                                    style={styles.stuAvatar}
                                />
                                <Badge
                                    value={item.score}
                                    textStyle={{ color: 'orange', fontSize: 13 }}
                                    containerStyle={styles.badgeText}
                                />
                                <Text style={styles.detailText}>
                                    {item.stuName}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                    <View>
                        <TouchableOpacity onPress={this.handleAddStu} style={styles.detailItem}>
                            <View
                                style={[styles.stuAvatar, styles.addStu]}
                            >
                                <Icon
                                    name="add"
                                    color="#00aced"
                                    size={34}
                                />
                            </View>
                            <Text style={styles.detailText}>
                                添加学生
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
               <View>
                   <PublicModal
                       isVisible={isVisible}
                       handleModal={this.handleModal}
                       renderComponent={<RemarkModalContent />}
                   />
               </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    detailContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginTop: 15,
        marginLeft: 6,
        paddingBottom: 30
    },
    stuAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    detailItem: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        width: 60
    },
    detailText: {
        fontSize: 12,
        marginTop: 7
    },
    addStu: {
        backgroundColor: '#f1f1f1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    badgeText: {
        width: 40,
        height: 20,
        position: 'relative',
        top: -7,
    },
});
export default StudentList;