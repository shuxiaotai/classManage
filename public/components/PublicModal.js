import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import { Icon } from 'react-native-elements';

class PublicModal extends Component{
    render() {
        const { renderComponent, isVisible, width, height, handleModal, leftFun, modalTitle, modalLeft} = this.props;
        return(
            <View
                style={{
                    display: isVisible ? 'flex' : 'none',
                    zIndex: 100,
                }}
            >
                <View
                    style={[styles.modalContainer, {width: width, height: height}]}
                >
                    <View
                        style={styles.remarkHeader}
                    >
                        <TouchableOpacity
                            style={styles.headerLeft}
                            onPress={leftFun}
                        >
                            <Text style={styles.headLeftText}>{modalLeft}</Text>
                        </TouchableOpacity>
                        <Text style={styles.remarkTitle}>{modalTitle}</Text>
                        <TouchableOpacity
                            style={styles.headerRight}
                            onPress={() => handleModal(false)}
                        >
                            <Icon
                                name={'close'}
                                color='gray'
                                size={19}
                            />
                        </TouchableOpacity>
                    </View>
                    {renderComponent}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        position: 'absolute',
        left: Dimensions.get('window').width / 2 - 150,
        top: Dimensions.get('window').height / 2 - 220,
        zIndex: 100,
    },
    headerLeft: {
        position: 'absolute',
        left: 13,
    },
    headLeftText: {
        color: '#0f7cda',
        fontSize: 13
    },
    remarkTitle: {
        fontSize: 15,
    },
    headerRight: {
        position: 'absolute',
        right: 10,
    },
    remarkHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 14,
        marginBottom: 10,
    },
});

export default PublicModal;