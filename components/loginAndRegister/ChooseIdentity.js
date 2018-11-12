import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import PublicBtn from "../../public/components/PublicBtn";
import { Icon } from 'react-native-elements';

class ChooseIdentity extends Component{
    constructor() {
        super();
        this.state = {
            selectIdentity: 1
        }
    }
    changeSelectIdentity = (id) => {
        this.setState({
            selectIdentity: id
        })
    };
    toHome = () => {
        const { navigate } = this.props.navigation;
        navigate('Home');
    };
    render() {
        const { selectIdentity } = this.state;
        return(
           <View>
               <View style={styles.chooseIdentity}>
                   <Text style={styles.topText}>
                       选择身份
                   </Text>
                   <Text style={styles.tipsText}>
                       身份一旦选择后无法更改
                   </Text>
                   <View style={styles.chooseContainer}>
                       <TouchableOpacity
                           style={styles.chooseImgContainer}
                           onPress={() => this.changeSelectIdentity(1)}
                       >
                           <Image
                               source={require('../../public/img/test.png')}
                               style={styles.chooseImg}
                           />
                           <View style={styles.checkIcon}>
                               <Icon
                                   name="check-circle"
                                   color={selectIdentity === 1 ? '#3498db' : 'gray'}
                               />
                           </View>
                       </TouchableOpacity>
                       <TouchableOpacity
                           onPress={() => this.changeSelectIdentity(2)}
                       >
                           <Image
                               source={require('../../public/img/test.png')}
                               style={styles.chooseImg}
                           />
                           <View style={styles.checkIcon}>
                               <Icon
                                   name="check-circle"
                                   color={selectIdentity === 2 ? '#3498db' : 'gray'}
                               />
                           </View>
                       </TouchableOpacity>
                   </View>
               </View>
               <View style={styles.loginInputContainer}>
                   <Text>您的名字</Text>
                   <TextInput
                       placeholder="不超过16位字符"
                       style={styles.loginInput}
                   />
               </View>
               <PublicBtn
                   tips="完成注册"
                   onPress={this.toHome}
               />
           </View>
       )
    }
}

const styles = StyleSheet.create({
    chooseIdentity: {
        marginTop: 40,
        alignItems: 'center'
    },
    topText: {
        fontSize: 20,
        marginBottom: 40
    },
    tipsText: {
        marginTop: 20,
        marginBottom: 20
    },
    chooseImg: {
        width: 90,
        height: 90,
        borderRadius: 45
    },
    chooseContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 40
    },
    chooseImgContainer: {
        marginRight: 40
    },
    loginInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 10,
        paddingLeft: 20
    },
    loginInput: {
        paddingLeft: 10
    },
    checkIcon: {
        position: 'relative',
        top: -20,
        right: -33,
        zIndex: 40
    }
});
export default ChooseIdentity;