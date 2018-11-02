import React, { Component } from 'react';
import { Icon, Badge, ButtonGroup } from 'react-native-elements';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AddStudent from "./AddStudent";

const list = [
    {
        key: 1,
        stuName: 'zsy',
        avatarUrl: '',
        score: 1
    },
    {
        key: 2,
        stuName: 'zsy',
        avatarUrl: '',
        score: 2
    },
    {
        key: 3,
        stuName: 'zsy',
        avatarUrl: '',
        score: 2
    },
    {
        key: 4,
        stuName: 'zsy',
        avatarUrl: '',
        score: 3
    },
    {
        key: 5,
        stuName: 'zsy',
        avatarUrl: '',
        score: 1
    }
];
const buttons = ['Hello', 'World', 'Buttons']
class StudentList extends Component{
    handleAddStu = () => {
        const { navigate } = this.props.navigation;
        navigate('AddStudent');
    };
    render() {
        return(
            <View style={styles.detailContainer}>
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
                    list.map((item) => (
                        <View style={styles.detailItem} key={item.key}>
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
                        </View>
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
        marginLeft: 6
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
        marginBottom: 10
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