import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import {checkUser, getTokenInfo} from "../../public/utils/checkUser";
import fetchData from "../../public/utils/fetchData";
import PublicCircleItem from "../../public/components/PublicCircleItem";

class ImportProject extends Component{
    constructor() {
        super();
        this.state = {
            defaultProjectList: [],
            defaultCourseList: [],
            defaultProjectIds: [],
            defaultCourseIds: []
        }
    }
    componentDidMount() {
        const { navigate } = this.props.navigation;
        checkUser(() => {
            fetchData.postData('/defaultProjectList').then((val) => {
                this.setState({
                    defaultProjectList: val.defaultProjectList,
                    defaultCourseList: val.defaultCourseList
                });
                this.getId(val.defaultProjectList, 'defaultProjectIds');
                this.getId(val.defaultCourseList, 'defaultCourseIds');
            });
        }, navigate);
    }
    getId = (list, valueName) => {
        let arr = [];
        list.forEach((item) => {
            arr.push(item.id);
        });
        this.setState({
            [valueName]: arr
        })
    };
    changeSelectIds = (id, selectList, selectChangeName) => {
        let index = selectList.indexOf(id);
        if (index === -1) {
            selectList.push(id);
        } else {
            selectList.splice(index, 1);
        }
        this.setState({
            [selectChangeName]: selectList
        });
    };
    toComplete = () => {
        const { navigation } = this.props;
        const { defaultProjectIds, defaultCourseIds } = this.state;
        const { setProjectComplete } = this.props.navigation.state.params;
        if (defaultProjectIds.length !== 0 || defaultCourseIds.length !== 0) {
            setProjectComplete(true)
        }
        navigation.goBack();
    };
    render() {
        const { navigation } = this.props;
        const { defaultProjectList, defaultCourseList, defaultProjectIds, defaultCourseIds } = this.state;
        return(
            <View>
                <PublicHeader
                    title="导入默认项目"
                    isLeft={true}
                    navigation={navigation}
                    isRight={true}
                    rightComponent={<Text style={{ color: '#fff' }}>完成</Text>}
                    rightPressFun={this.toComplete}
                />
                <View style={styles.tips}>
                    <Text>日程模板</Text>
                </View>
                <View style={styles.templateList}>
                    {
                        defaultProjectList.map((item) => (
                            <PublicCircleItem
                                item={item}
                                key={item.id}
                                ImgWidth={60}
                                ImgHeight={60}
                                ImgRadius={30}
                                isEnableCheck={true}
                                selectList={defaultProjectIds}
                                pressFun={this.changeSelectIds}
                                selectChangeName="defaultProjectIds"
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
                                pressFun={this.changeSelectIds}
                                selectChangeName="defaultCourseIds"
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
export default ImportProject;