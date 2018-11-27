import React, { Component } from 'react';
import { Text, View, SectionList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";

class addressBookScreen extends Component{
    constructor() {
        super();
        this.state = {
            sections: [
                { title: "A", data: [{name: 'item1'}, {name: 'item2'}] },
                { title: "B", data: [{name: 'item3'}, {name: 'item4'}] },
                { title: "C", data: [{name: 'item5'}, {name: 'item6'}] }
            ]
        }
    }

    renderAddressBook = ({ item, index }) => {
        return(
            <TouchableOpacity style={styles.bookItem}>
                <Image
                    source={require('../../public/img/test.png')}
                    style={styles.userImg}
                />
                <Text>{item.name}</Text>
                <Text style={styles.roleText}>老师</Text>
            </TouchableOpacity>
        )
    };

    onLetterSelect = (key) => {
        this.sectionList.scrollToLocation({sectionIndex: key, itemIndex: 0, viewOffset: 28});
    };
    render() {
        const {sections} = this.state;
        return(
            <View>
                <PublicHeader title="通讯录" />
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
                    <TouchableOpacity
                        onPress={() => this.onLetterSelect(0)}
                    >
                        <Text>a</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.onLetterSelect(1)}
                    >
                        <Text>b</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.onLetterSelect(2)}
                    >
                        <Text>c</Text>
                    </TouchableOpacity>
                </View>
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
        marginLeft: 10
    }
});
export default addressBookScreen;