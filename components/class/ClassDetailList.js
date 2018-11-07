import React, { Component } from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import PublicTab from "../../public/components/PublicTab";
import StudentList from "./StudentList";
import StudentGroupList from "./StudentGroupList";
import PublicModal from "../../public/components/PublicModal";
import RemarkModalContent from "./RemarkModalContent";
import PublicMask from "../../public/components/PublicMask";
import GroupModalContent from "./GroupModalContent";


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
            selectKey: 2,
            isStudentVisible: false,
            isGroupVisible: false,
        }
    }

    onChangeSelectKey = (key) => {
        this.setState({
            selectKey: key
        })
    };
    handleStudentListModal = (visible) => {
        this.setState({
            isStudentVisible: visible
        })
    };
    handleGroupListModal = (visible) => {
        this.setState({
            isGroupVisible: visible
        })
    };
    toStudentHomePage = () => {
        const { navigate } = this.props.navigation;
        navigate('StudentHomePage');
    };
    toEditGroup = () => {
        const { navigate } = this.props.navigation;
        navigate('EditGroupInfo');
    };
    render() {
        const { navigation } = this.props;
        // const { classText } = navigation.state.params;   //为了方便写界面，暂时注释
        const { selectKey, isStudentVisible, isGroupVisible } = this.state;
        return(
            <View>
                <PublicMask
                    isVisible={isStudentVisible ? isStudentVisible : isGroupVisible}
                    handleModal={isStudentVisible ? this.handleStudentListModal : this.handleGroupListModal}
                    width={Dimensions.get('window').width}
                    height={Dimensions.get('window').height}
                />
                <PublicModal
                    isVisible={isStudentVisible ? isStudentVisible : isGroupVisible}
                    width={300}
                    height={isStudentVisible ? 400 : 400}
                    leftFun={isStudentVisible ? this.toStudentHomePage : this.toEditGroup}
                    handleModal={isStudentVisible ? this.handleStudentListModal : this.handleGroupListModal}
                    modalLeft={(isStudentVisible && isGroupVisible) ? '' : (isStudentVisible ? '学生主页' : '编辑小组')}
                    modalTitle={(isStudentVisible && isGroupVisible) ? '点评第一小组' : (isStudentVisible ? '点评舒小台' : '第一小组')}
                    renderComponent={
                        isStudentVisible ?
                        <RemarkModalContent
                            navigation={navigation}
                        /> :
                            <GroupModalContent
                                handleModal={this.handleStudentListModal}   //点评小组
                            />
                    }
                />
                <PublicHeader title="sssss" isLeft={true} navigation={navigation} />
                <PublicTab tabItem={tabItem} selectKey={selectKey} onChangeSelectKey={this.onChangeSelectKey} />
                {
                    selectKey === 1 ?
                        <StudentList
                            navigation={navigation}
                            // isVisible={isStudentVisible}
                            handleModal={this.handleStudentListModal}
                        /> : null
                }
                {
                    selectKey === 2 ?
                        <StudentGroupList
                            navigation={navigation}
                            // isVisible={isGroupVisible}
                            handleModal={this.handleGroupListModal}
                        /> : null
                }
            </View>
        );

    }
}

export default ClassDetailList;

















