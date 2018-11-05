import React, { Component } from 'react';
import {View, Modal, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

class PublicModal extends Component{
    render() {
        const { renderComponent, isVisible } = this.props;
        return(
            <View
                style={{
                    display: isVisible ? 'flex' : 'none',
                    zIndex: 100,
                }}
            >
                <View
                    style={styles.modalContainer}
                >
                    {renderComponent}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        width: 300,
        height: 430,
        backgroundColor: '#fff',
        borderRadius: 10,
        position: 'absolute',
        left: Dimensions.get('window').width / 2 - 150,
        top: Dimensions.get('window').height / 2 - 250,
        zIndex: 100,
    }
});

export default PublicModal;