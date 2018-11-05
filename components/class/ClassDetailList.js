import React, { Component } from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import PublicTab from "../../public/components/PublicTab";
import StudentList from "./StudentList";
import StudentGroupList from "./StudentGroupList";
import PublicModal from "../../public/components/PublicModal";
import RemarkModalContent from "./RemarkModalContent";


const tabItem = [
    {
        name: '学生',
        key: 1,
    }, {
        name: '小组',
        key: 2,
    },  {
        name: '家长',
        key: 3,
    }
];

class ClassDetailList extends Component{
    constructor() {
        super();
        this.state = {
            selectKey: 1,
            isVisible: false,
        }
    }

    onChangeSelectKey = (key) => {
        this.setState({
            selectKey: key
        })
    };
    handleModal = (visible) => {
        this.setState({
            isVisible: visible
        })
    };
    render() {
        const { navigation } = this.props;
        // const { classText } = navigation.state.params;   //为了方便写界面，暂时注释
        const { selectKey, isVisible } = this.state;
        return(
            <View>
                <TouchableOpacity
                    style={isVisible ? styles.maskContainer : styles.maskContainerHidden}
                    onPress={() => this.handleModal(false)}
                    activeOpacity={1}
                >
                </TouchableOpacity>
                <PublicModal
                    isVisible={isVisible}
                    handleModal={this.handleModal}
                    renderComponent={<RemarkModalContent handleModal={this.handleModal} />}
                />
                <PublicHeader title="sssss" isLeft={true} navigation={navigation} />
                <PublicTab tabItem={tabItem} selectKey={selectKey} onChangeSelectKey={this.onChangeSelectKey} />
                {
                    selectKey === 1 ?
                        <StudentList
                            navigation={navigation}
                            isVisible={isVisible}
                            handleModal={this.handleModal}
                        /> : null
                }
                {
                    selectKey === 2 ? <StudentGroupList navigation={navigation} /> : null
                }
            </View>
        );

    }
}

const styles = StyleSheet.create({
    maskContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        display: 'flex',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 10
    },
    maskContainerHidden: {
        display: 'none'
    }
});


export default ClassDetailList;

















