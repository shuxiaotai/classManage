import React, {Component} from 'react';
import {View} from 'react-native';
import CheckList from './CheckList';
import PublicHeader from '../../public/components/PublicHeader';

class CheckChartDetail extends Component {
  render() {
    const {navigation} = this.props;
    const {checkId} = navigation.state.params;
    return (
      <View>
        <PublicHeader title="考勤详情" isLeft={true} navigation={navigation} />
        <CheckList isDetail={true} checkId={checkId} navigation={navigation} />
      </View>
    );
  }
}

export default CheckChartDetail;
