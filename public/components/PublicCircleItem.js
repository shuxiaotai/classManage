import React from 'react';
import {TouchableOpacity, Text, Image, StyleSheet, View} from 'react-native';
import getProtocol from '../utils/getProtocol';
import {Icon} from 'react-native-elements';

const PublicCircleItem = props => {
  const {
    item,
    pressFun,
    activeOpacity,
    ImgWidth,
    ImgHeight,
    ImgRadius,
    isEnableCheck,
    selectList,
    selectKey,
    changeFresh,
    isParent,
  } = props;
  return (
    <TouchableOpacity
      style={styles.courseItem}
      onPress={
        pressFun
          ? () => {
              pressFun(item.id, selectList, selectKey);
              if (changeFresh) {
                changeFresh();
              }
            }
          : null
      }
      activeOpacity={activeOpacity ? activeOpacity : 0.4}>
      <Image
        source={{
          uri: getProtocol() + (item.img_url ? item.img_url : item.avatar_url),
        }}
        style={{
          width: ImgWidth ? ImgWidth : 50,
          height: ImgHeight ? ImgHeight : 50,
          borderRadius: ImgRadius ? ImgRadius : 25,
        }}
      />
      {isEnableCheck ? (
        <View style={styles.checkIconContainer}>
          <Icon
            name="check-circle"
            color={selectList.indexOf(item.id) !== -1 ? '#3498db' : 'gray'}
            size={22}
          />
        </View>
      ) : null}
      <Text style={styles.remark}>
        {item.name}
        {isParent ? (
          <Text style={styles.parentText}>({item.student_name})</Text>
        ) : null}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  courseItem: {
    display: 'flex',
    width: 89,
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  remark: {
    marginTop: 8,
  },
  checkIconContainer: {
    position: 'absolute',
    right: 4,
    zIndex: 100,
  },
  parentText: {
    color: 'gray',
    fontSize: 12,
  },
});

export default PublicCircleItem;
