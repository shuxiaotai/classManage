import React, { Component } from 'react';
import { Header, Icon } from 'react-native-elements';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

class PublicHeader extends Component {

    getLeftComponent = () => {
        return(
            <TouchableOpacity onPress={this.toBack} style={styles.backContainer}>
                <Icon
                    name='chevron-left'
                    color='#fff' />
                <Text style={styles.backText}>返回</Text>
            </TouchableOpacity>
        );
    };
    toBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    };
    render() {
        const { title, isLeft, isRight, leftComponent, rightComponent } = this.props;
        return(
            <View>
                {
                    (isLeft && isRight) ?
                        <Header
                            leftComponent={leftComponent ? leftComponent : this.getLeftComponent()}
                            centerComponent={{ text: title, style: { color: '#fff' } }}
                            rightComponent={rightComponent}
                        />
                        : null
                }
                {
                    (isLeft && !isRight) ?
                        <Header
                            leftComponent={leftComponent ? leftComponent : this.getLeftComponent()}
                            centerComponent={{ text: title, style: { color: '#fff' } }}
                        />
                        : null
                }
                {
                    (isRight && !isLeft) ?
                        <Header
                            centerComponent={{ text: title, style: { color: '#fff' } }}
                        />
                        : null
                }
                {
                    (!isLeft && !isRight) ? <Header centerComponent={{ text: title, style: { color: '#fff' } }} /> : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    backText: {
        color: '#fff'
    }
});
export default PublicHeader;