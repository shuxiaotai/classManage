import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity, AsyncStorage, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import PublicBtn from "../../public/components/PublicBtn";
import { Icon } from 'react-native-elements';
import fetchData from "../../public/utils/fetchData";
import app from "../../app.json";
import * as loginActions from './Actions/LoginAction';
import { Button } from 'react-native-elements';

class ChooseIdentity extends Component{
    constructor() {
        super();
        this.state = {
            selectIdentity: 0, //0是老师，1是家长
            username: '',
            showAutoLoginTips: false
        }
    }
    componentDidMount() {
        let that = this;
        const { navigate } = this.props.navigation;
        AsyncStorage.getItem('token', function (error, result) {
            if (error) {
                console.log('失败');
            }else {
                fetchData.postData(app.host + app.port + '/checkLogin',
                    {
                        token: result
                    }
                ).then((val) => {
                    if(val.autoLogin) {
                        that.setState({
                            showAutoLoginTips: true
                        });
                        setTimeout(() => {
                            that.setState({
                                showAutoLoginTips: false
                            });
                            navigate('Home');
                        }, 1000);
                    }else {
                        alert('身份已过期，请重新登录');
                    }
                });
            }
        });

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
        const { selectIdentity, showAutoLoginTips } = this.state;
        return(
           <View>
               <View style={showAutoLoginTips ? styles.loadContainer: styles.hiddenAutoLogin}>
                   <Button
                       title=""
                       loading
                       loadingProps={{ size: "large", color: "gray" }}
                       titleStyle={{ fontWeight: "700" }}
                       buttonStyle={{
                           backgroundColor: "#fff",
                           width: 300,
                           height: 100,
                           borderColor: "transparent",
                           borderRadius: 0,
                           borderTopLeftRadius: 5,
                           borderTopRightRadius: 5
                       }}
                       containerStyle={{ marginTop: 20 }}
                   />
                   <View style={styles.autoLoginTips}>
                       <Text style={{color: 'gray'}}>自动登录中...</Text>
                   </View>
               </View>
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
    },
    loadContainer: {
        position: 'absolute',
        flexDirection: 'column',
        alignItems: 'center',
        left: Dimensions.get('window').width / 2 - 150,
        top: 200,
        zIndex: 30
    },
    autoLoginTips: {
        width: 300,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 30,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    hiddenAutoLogin: {
        display: 'none'
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