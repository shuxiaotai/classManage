import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import listData from "../../public/mockData/listData";
import PublicCircleItem from "../../public/components/PublicCircleItem";
import PublicNoContent from "../../public/components/PublicNoContent";

class ParentList extends Component{
    render() {
        const { parentList } = this.props;
        return(
          <View style={styles.parentListContainer}>
              {
                  parentList.map((item) => (
                      <PublicCircleItem
                          item={item}
                          key={item.id}
                          ImgWidth={60}
                          ImgHeight={60}
                          ImgRadius={30}
                          isParent={true}
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