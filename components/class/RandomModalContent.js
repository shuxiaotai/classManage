import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

let list = [
    {
        key: 1,
        name: 'sxt1'
    },
    {
        key: 2,
        name: 'sss2'
    },
    {
        key: 3,
        name: '朱叔叔3'
    },
    {
        key: 4,
        name: '朱sss4'
    },
    {
        key: 5,
        name: '朱sss5'
    }
];

class RandomModalContent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectStudent: list[0]
        }
    }
    componentDidMount() {
        let timer = setInterval(() => {
            let i = Math.floor(Math.random() * list.length);
            this.setState({
                selectStudent: list[i]
            });
            console.log(i);
        }, 100);
        setTimeout(() => {
            clearInterval(timer)
        }, 1000);
    };
    render() {
        const { selectStudent } = this.state;
        return(
            <View style={styles.randomContainer}>
                <View style={styles.randomWrapper}>
                    <Image
                        source={require('../../public/img/test.png')}
                        style={styles.randomImg}
                    />
                    <Text style={styles.randomText}>{selectStudent ? selectStudent.name : ''}</Text>
                </View>
                <TouchableOpacity style={styles.sendRemark}>
                    <Text style={{ color: '#fff' }}>发送点评</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    randomContainer: {
        alignItems: 'center',
        marginTop: 70,
        position: 'relative',
        flex: 1,
    },
    randomWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    randomImg: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    randomText: {
        fontSize: 25,
        marginTop: 15
    },
    sendRemark: {
        height: 50,
        width: '100%',
        bottom: 0,
        position: 'absolute',
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
export default RandomModalContent;