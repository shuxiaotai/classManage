import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

//上拉加载，下拉刷新
const refreshState = {
    Init: 'Init',               // 初始状态
    CanLoadMore: 'CanLoadMore', // 可以加载更多
    Refreshing: 'Refreshing',   // 正在刷新中
    NoMoreData: 'NoMoreData',   // 没有更多数据了
    Failure: 'Failure'          // 刷新失败
};
let page = 1;
class PublicRefreshList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isHeaderRefreshing: false,   //头部是否在刷新
            footerState: refreshState.Init,  //尾部当前的状态
            isLoading: true,
        };
    }
    componentDidMount() {
        //请求数据
        const { getList } = this.props;
        // getList(page);
    }
    //下拉刷新
    beginHeaderRefresh = () => {
        const { footerState } = this.state;
        if (footerState !== refreshState.refreshing) {
            this.headerRefreshing();
        }
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
    //上拉加载
    beginFooterRefresh = () => {
        const { getList, totalPage } = this.props;
        if ((page !== 1) && (page > totalPage)) {
            this.setState({ footerState: refreshState.NoMoreData });
            return;
        } else {
            if(this.state.isLoading && (this.state.footerState === refreshState.Init || this.state.footerState === refreshState.CanLoadMore)) {
                page++;
                this.setState({ footerState: refreshState.Refreshing });
                this.setState({ isLoading: false });
            }
        }
        setTimeout(() => {
            getList(page);
            this.setState({ footerState: refreshState.CanLoadMore });
            this.setState({ isLoading: true });
        }, 3000)
    };

    //底部文字
    renderFooter = () => {
        const { footerState } = this.state;
        return(
            <View style={styles.refreshFooter}>
                {
                    footerState === refreshState.Refreshing ? <Text>正在加载...</Text> : null
                }
                {
                    footerState === refreshState.Failure ? <Text>加载失败</Text> : null
                }
                {
                    footerState === refreshState.NoMoreData ? <Text>没有更多内容了</Text> : null
                }
            </View>
        )
    };
    _keyExtractor = (item) => item.id.toString();
    render() {
        const { isHeaderRefreshing } = this.state;
        const { getRenderItem, dataArr, ListEmptyComponent, ListHeaderComponent, totalPage } = this.props;
        return(
            <View>
                {
                    totalPage < 8 ?
                        <FlatList
                            data={dataArr}
                            renderItem={getRenderItem()}
                            ListEmptyComponent={ListEmptyComponent}
                            keyExtractor={this._keyExtractor}
                            ListHeaderComponent={ListHeaderComponent ? ListHeaderComponent : null}
                        /> :
                        <FlatList
                            data={dataArr}
                            onRefresh={() => this.beginHeaderRefresh()}
                            refreshing={isHeaderRefreshing}
                            renderItem={getRenderItem()}
                            onEndReachedThreshold={0.1}
                            onEndReached={() => this.beginFooterRefresh()}
                            ListFooterComponent={this.renderFooter}
                            ListHeaderComponent={ListHeaderComponent}
                            ListEmptyComponent={ListEmptyComponent}
                            keyExtractor={this._keyExtractor}
                        />
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    refreshFooter: {
        marginBottom: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    }
});
export default PublicRefreshList;