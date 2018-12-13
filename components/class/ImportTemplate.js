import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import {checkUser, getTokenInfo} from "../../public/utils/checkUser";
import fetchData from "../../public/utils/fetchData";
import PublicCircleItem from "../../public/components/PublicCircleItem";

class ImportTemplate extends Component{
    constructor() {
        super();
        this.state = {
            defaultPraiseList: [],
            defaultCriticizeList: [],
            defaultPraiseIds: [],
            defaultCriticizeIds: []
        }
    }
    componentDidMount() {
        const { navigate } = this.props.navigation;
        checkUser(() => {
            fetchData.postData('/defaultTemplateList').then((val) => {
                this.setState({
                    defaultPraiseList: val.defaultPraiseList,
                    defaultCriticizeList: val.defaultCriticizeList
                });
                this.getId(val.defaultPraiseList, 'defaultPraiseIds');
                this.getId(val.defaultCriticizeList, 'defaultCriticizeIds');
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
        const { defaultPraiseIds, defaultCriticizeIds } = this.state;
        const { setTemplateComplete } = this.props.navigation.state.params;
        if (defaultPraiseIds.length !== 0 || defaultCriticizeIds.length !== 0) {
            setTemplateComplete(true)
        }
        navigation.goBack();
    };
    render() {
        const { navigation } = this.props;
        const { defaultPraiseList, defaultCriticizeList, defaultPraiseIds, defaultCriticizeIds } = this.state;
        return(
            <View>
                <PublicHeader
                    title="导入默认模板"
                    isLeft={true}
                    navigation={navigation}
                    isRight={true}
                    rightComponent={<Text style={{ color: '#fff' }}>完成</Text>}
                    rightPressFun={this.toComplete}
                />
                <View style={styles.tips}>
                    <Text>表扬模板</Text>
                </View>
                <View style={styles.templateList}>
                    {
                        defaultPraiseList.map((item) => (
                            <PublicCircleItem
                                item={item}
                                key={item.id}
                                ImgWidth={60}
                                ImgHeight={60}
                                ImgRadius={30}
                                isEnableCheck={true}
                                selectList={defaultPraiseIds}
                                pressFun={this.changeSelectIds}
                                selectChangeName="defaultPraiseIds"
                            />
                        ))
                    }
                </View>
                <View style={styles.tips}>
                    <Text>批评模板</Text>
                </View>
                <View style={styles.templateList}>
                    {
                        defaultCriticizeList.map((item) => (
                            <PublicCircleItem
                                item={item}
                                key={item.id}
                                ImgWidth={60}
                                ImgHeight={60}
                                ImgRadius={30}
                                isEnableCheck={true}
                                selectList={defaultCriticizeIds}
                                pressFun={this.changeSelectIds}
                                selectChangeName="defaultCriticizeIds"
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
export default ImportTemplate;