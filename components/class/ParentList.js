import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import listData from "../../public/mockData/listData";
import PublicCircleItem from "../../public/components/PublicCircleItem";

class ParentList extends Component{
    render() {
        return(
          <View style={styles.parentListContainer}>
              {
                  listData.parentList.map((item) => (
                      <PublicCircleItem
                          item={item}
                          key={item.key}
                          ImgWidth={60}
                          ImgHeight={60}
                          ImgRadius={30}
                      />
                  ))
              }
          </View>
        );
    }
}

const styles = StyleSheet.create({
    parentListContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 15,
        marginLeft: 8
    }
});

export default ParentList;