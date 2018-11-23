import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import PublicHeader from "../../public/components/PublicHeader";
import listData from "../../public/mockData/listData";

class SelectGrade extends Component{
    constructor() {
        super();
        this.state = {
            selectGradeId: ''
        }
    }
    toSelectThisGrade = (id) => {
        this.setState({
            selectGradeId: id
        })
    };
    render() {
        const { navigation } = this.props;
        const { selectGradeId } = this.state;
        return(
            <View>
                <PublicHeader
                    title="年级"
                    isLeft={true}
                    navigation={navigation}
                />
                <View style={styles.selectGradeContainer}>
                    {
                        listData.gradeList.map((item) => (
                            <TouchableOpacity
                                style={styles.selectGradeItem}
                                key={item.id}
                                onPress={() => this.toSelectThisGrade(item.id)}
                            >
                                <Text>{item.name}</Text>
                                {
                                    selectGradeId === item.id ?
                                        <View style={styles.checkIcon}>
                                            <Icon
                                                name="check"
                                                size={15}
                                                color="#3498db"
                                            />
                                        </View> : null
                                }
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    selectGradeContainer: {
        marginTop: 10
    },
    selectGradeItem: {
        height: 40,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
        paddingLeft: 15
    },
    checkIcon: {
        position: 'absolute',
        right: 20
    }
});

export default SelectGrade;