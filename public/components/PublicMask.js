import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

class PublicMask extends Component {
  render() {
    const {
      isVisible,
      handleModal,
      width,
      height,
      top,
      backgroundColor,
    } = this.props;
    return (
      <TouchableOpacity
        style={
          isVisible
            ? [
                styles.maskContainer,
                {
                  width: width,
                  height: height,
                  top: top ? top : 0,
                  backgroundColor: backgroundColor
                    ? backgroundColor
                    : 'rgba(0, 0, 0, 0.4)',
                },
              ]
            : styles.maskContainerHidden
        }
        onPress={handleModal ? () => handleModal(false) : null}
        activeOpacity={1}
      />
    );
  }
}

const styles = StyleSheet.create({
  maskContainer: {
    position: 'absolute',
    zIndex: 10,
  },
  maskContainerHidden: {
    display: 'none',
  },
});

export default PublicMask;
