import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import PublicCircleItem from "../../public/components/PublicCircleItem";
import { connect } from 'react-redux';

class ImportProject extends Component{
    constructor() {
        super();
        this.state = {
            isFresh: false
        }
    }
    changeFresh = () => {
        this.setState({
            isFresh: !this.state.isFresh
        })
    };
    toComplete = () => {
        const { navigation } = this.props;
        const { changeClassFresh } = this.props.navigation.state.params;
        changeClassFresh();
        navigation.goBack();
    };
    toBackAndFresh = () => {
        const { navigation } = this.props;
        const { changeClassFresh } = this.props.navigation.state.params;
        navigation.goBack();
        changeClassFresh();
    };
    render() {
        const { navigation, defaultScheduleIds, defaultCourseIds } = this.props;
        const { defaultScheduleList, defaultCourseList, changeSelectIds } = this.props.navigation.state.params;
        return(
            <View>
                <PublicHeader
                    title="导入默认项目"
                    isLeft={true}
                    navigation={navigation}
                    isRight={true}
                    rightComponent={<Text style={{ color: '#fff' }}>完成</Text>}
                    rightPressFun={this.toComplete}
                    leftPressFun={this.toBackAndFresh}
                />
                <View style={styles.tips}>
                    <Text>日程模板</Text>
                </View>
                <View style={styles.templateList}>
                    {
                        defaultScheduleList.map((item) => (
                            <PublicCircleItem
                                item={item}
                                key={item.id}
                                ImgWidth={60}
                                ImgHeight={60}
                                ImgRadius={30}
                                isEnableCheck={true}
                                selectList={defaultScheduleIds}
                                pressFun={changeSelectIds}
                                selectKey={2}
                                changeFresh={this.changeFresh}
                            />
                        ))
                    }
                </View>
                <View style={styles.tips}>
                    <Text>课程模板</Text>
                </View>
                <View style={styles.templateList}>
                    {
                        defaultCourseList.map((item) => (
                            <PublicCircleItem
                                item={item}
                                key={item.id}
                                ImgWidth={60}
                                ImgHeight={60}
                                ImgRadius={30}
                                isEnableCheck={true}
                                selectList={defaultCourseIds}
                                pressFun={changeSelectIds}
                                selectKey={3}
                                changeFresh={this.changeFresh}
                            />
                        ))
                    }
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    tips: {
        marginVertical: 20,
        marginLeft: 15,
        borderStyle: 'solid',
        borderLeftWidth: 5,
        borderLeftColor: 'skyblue',
        paddingLeft: 10
    },
    templateList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingLeft: 8
    }
});
const mapStateToProps = (state) => {
    return {
        defaultScheduleIds: state.classReducer.defaultScheduleIds,
        defaultCourseIds: state.classReducer.defaultCourseIds,
    }
};
export default connect(mapStateToProps, null)(ImportProject);