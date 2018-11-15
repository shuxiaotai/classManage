import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PublicBtn from "../../public/components/PublicBtn";
import { Icon } from 'react-native-elements';
import fetchData from "../../public/utils/fetchData";
import app from "../../app.json";
import * as loginActions from './Actions/LoginAction';

class ChooseIdentity extends Component{
    constructor() {
        super();
        this.state = {
            selectIdentity: 0, //0是老师，1是家长
            username: ''
        }
    }
    changeSelectIdentity = (id) => {
        this.setState({
            selectIdentity: id
        })
    };
    gotoNextStep = () => {
        const { navigate } = this.props.navigation;
        const { username, selectIdentity } = this.state;
        const { setHasRegister, setUsername, setSelectIdentity } = this.props;
        if(username === '') {
            alert('名字不能为空');
        }else {
            fetchData.postData(app.host + app.port + '/selectIdentity',
                {
                    username: username,
                    selectIdentity: selectIdentity
                }
            ).then((val) => {
                setHasRegister(val.hasRegister);
                setUsername(username);
                setSelectIdentity(selectIdentity);
                navigate('LoginOrRegister');
            });
        }
    };
    render() {
        const { selectIdentity, username } = this.state;
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
                           onPress={() => this.changeSelectIdentity(0)}
                       >
                           <Image
                               source={require('../../public/img/test.png')}
                               style={styles.chooseImg}
                           />
                           <View style={styles.checkIcon}>
                               <Icon
                                   name="check-circle"
                                   color={selectIdentity === 0 ? '#3498db' : 'gray'}
                               />
                           </View>
                           <Text style={styles.identityText}>老师</Text>
                       </TouchableOpacity>
                       <TouchableOpacity
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
                           <Text style={styles.identityText}>家长</Text>
                       </TouchableOpacity>
                   </View>
               </View>
               <View style={styles.loginInputContainer}>
                   <Text>您的名字</Text>
                   <TextInput
                       placeholder="不超过16位字符"
                       style={styles.loginInput}
                       onChangeText={(username) => this.setState({username})}
                       // value={username}
                       autoCapitalize="none"
                   />
               </View>
               <PublicBtn
                   tips="下一步"
                   onPress={this.gotoNextStep}
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
        marginRight: 60
    },
    loginInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 10,
        paddingLeft: 20
    },
    loginInput: {
        marginLeft: 10,
        zIndex: 10,
        width: 200
    },
    checkIcon: {
        position: 'relative',
        top: -20,
        right: -33,
        zIndex: 40
    },
    identityText: {
        alignSelf: 'center',
        marginTop: -10
    }
});
const mapDispatchToProps = (dispatch) => {
    return {
        setHasRegister: (hasRegister) => {
            dispatch(loginActions.setHasRegister(hasRegister));
        },
        setUsername: (username) => {
            dispatch(loginActions.setUsername(username));
        },
        setSelectIdentity: (selectIdentity) => {
            dispatch(loginActions.setSelectIdentity(selectIdentity));
        }
    }
};
export default connect(null, mapDispatchToProps)(ChooseIdentity);