import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import {getLocalImgIndex} from "../../public/utils/getLocalImg";

class RandomModalContent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectStudent: props.studentList[0]
        }
    }
    componentDidMount() {
        const { studentList } = this.props;
        let timer = setInterval(() => {
            let i = Math.floor(Math.random() * studentList.length);
            this.setState({
                selectStudent: studentList[i]
            });
        }, 100);
        setTimeout(() => {
            clearInterval(timer)
        }, 1000);
    };
    toRemarkRandomStudent = () => {
        const { handleStudentListModal, setCurrentStudent, handleRandomModal, showRandomModal } = this.props;
        const { selectStudent } = this.state;
        handleStudentListModal(true);   //显示点评界面
        setCurrentStudent(selectStudent);
        handleRandomModal(false);
        showRandomModal(true)
    };
    render() {
        const { selectStudent } = this.state;
        return(
            <View style={styles.randomContainer}>
                <View style={styles.randomWrapper}>
                    <Image
                        source={getLocalImgIndex('student', selectStudent['avatar_url'])}
                        style={styles.randomImg}
                    />
                    <Text style={styles.randomText}>{selectStudent ? selectStudent.name : ''}</Text>
                </View>
                <TouchableOpacity
                    style={styles.sendRemark}
                    onPress={this.toRemarkRandomStudent}
                >
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