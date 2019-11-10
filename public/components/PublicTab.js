import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';

class PublicTab extends Component {
  touchTab = key => {
    const {onChangeSelectKey} = this.props;
    onChangeSelectKey(key);
  };
  render() {
    const {tabItem, selectKey} = this.props;
    return (
      <View style={styles.tabContainer}>
        {tabItem.map(item => (
          <TouchableWithoutFeedback
            onPress={() => this.touchTab(item.key)}
            key={item.key}>
            <View
              style={[
                styles.tab,
                item.key === selectKey ? styles.selectedTab : null,
              ]}>
              <Text style={item.key === selectKey ? styles.selectedText : null}>
                {item.name}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: '100%',
  },
  tab: {
    flex: 1,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTab: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#0f7cda',
  },
  selectedText: {
    color: '#0f7cda',
  },
});

export default PublicTab;
