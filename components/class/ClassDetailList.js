import React, { Component } from 'react';
import {View, Dimensions} from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import PublicTab from "../../public/components/PublicTab";
import StudentList from "./StudentList";
import StudentGroupList from "./StudentGroupList";
import PublicModal from "../../public/components/PublicModal";
import RemarkModalContent from "./RemarkModalContent";
import PublicMask from "../../public/components/PublicMask";
import GroupModalContent from "./GroupModalContent";
import ParentList from "./ParentList";
import PublicScrollView from "../../public/components/PublicScrollView";
import RandomModalContent from "./RandomModalContent";


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
            isStudentVisible: false,
            isGroupVisible: false,
            isRandomVisible: false,
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
    handleRandomModal = (visible) => {
        this.setState({
            isRandomVisible: visible
        })
    };
    render() {
        const { navigation } = this.props;
        // const { classText } = navigation.state.params;   //为了方便写界面，暂时注释
        const { selectKey, isStudentVisible, isGroupVisible, isRandomVisible } = this.state;
        return(
            <View>
                <PublicMask
                    isVisible={isRandomVisible ? isRandomVisible : (isStudentVisible ? isStudentVisible : isGroupVisible)}
                    handleModal={isRandomVisible ? this.handleRandomModal : (isStudentVisible ? this.handleStudentListModal : this.handleGroupListModal)}
                    width={Dimensions.get('window').width}
                    height={Dimensions.get('window').height}
                />
                <PublicModal
                    isVisible={isRandomVisible ? isRandomVisible : (isStudentVisible ? isStudentVisible : isGroupVisible)}
                    width={300}
                    height={isStudentVisible ? 400 : 400}
                    leftFun={isRandomVisible ? null : (isStudentVisible ? this.toStudentHomePage : this.toEditGroup)}
                    handleModal={isRandomVisible ? this.handleRandomModal : (isStudentVisible ? this.handleStudentListModal : this.handleGroupListModal)}
                    modalLeft={isRandomVisible ? '' : ((isStudentVisible && isGroupVisible) ? '' : (isStudentVisible ? '学生主页' : '编辑小组'))}
                    modalTitle={isRandomVisible ? '随机抽选' : ((isStudentVisible && isGroupVisible) ? '点评第一小组' : (isStudentVisible ? '点评舒小台' : '第一小组'))}
                    renderComponent={
                        isRandomVisible ?
                            <RandomModalContent />
                            : (
                            isStudentVisible ?
                                <RemarkModalContent
                                    navigation={navigation}
                                /> :
                                <GroupModalContent
                                    handleModal={this.handleStudentListModal}   //点评小组
                                />
                            )
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
                            handleRandomModal={this.handleRandomModal}
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
                {
                    selectKey === 3 ?
                        <PublicScrollView
                            renderView={<ParentList /> }
                        /> :
                        null
                }
            </View>
        );

    }
}

export default ClassDetailList;

















