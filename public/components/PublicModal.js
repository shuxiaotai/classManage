import React from 'react';
import {View, Modal, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

const PublicModal = (props) => {
    return(
        <Modal
            visible={props.isVisible}
            animationType={'none'}
            transparent = {true}
        >
            <TouchableOpacity
                style={styles.maskContainer}
                // onPress={props.handleModal}
                activeOpacity={1}
            >
                <View
                    style={styles.modalContainer}
                >
                    {props.renderComponent}
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    maskContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContainer: {
        width: 300,
        height: 400,
        backgroundColor: '#fff',
        borderRadius: 10
    }
});

export default PublicModal;