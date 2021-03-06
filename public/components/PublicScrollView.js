import React, { Component } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';

//下拉刷新
class PublicScrollView extends Component{
    constructor() {
        super();
        this.state = {
            isHeaderRefreshing: false
        }
    }
    headerRefreshing = () => {
        const { updateFun } = this.props;
        this.setState({
            isHeaderRefreshing: true
        });
        updateFun(true,
            () => {
                setTimeout(() => {
                    alert('刷新成功');
                    this.setState({
                        isHeaderRefreshing: false
                    });
                }, 1000)
            }
        );
    };
    render() {
        const { isHeaderRefreshing } = this.state;
        const { renderView, setMarginBottom } = this.props;
        return(
            <View style={{ marginBottom: (setMarginBottom ? setMarginBottom : 0) }}>
                <ScrollView
                    horizontal={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={isHeaderRefreshing}
                            onRefresh={() => this.headerRefreshing()}
                        />
                    }
                >
                    {renderView}
                </ScrollView>
            </View>
        )
    }
}

export default PublicScrollView;