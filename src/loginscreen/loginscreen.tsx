import React, { Component } from "react";

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    KeyboardAvoidingView,
} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { CommonActions } from '@react-navigation/native';

import DeviceInfo from 'react-native-device-info';

type MyProps = { navigation: any };

type MyState = {
    usernameValue: string,
    passwordValue: string,
    token: string,
    loggingIn: boolean,
    loginError: boolean,
    loginErrorMessage: string | null,
};

export default class LoginScreen extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            usernameValue: '',
            passwordValue: '',
            token: '',
            loggingIn: false,
            loginError: false,
            loginErrorMessage: null,
        };
    }

    async componentDidMount() {
        AsyncStorage.getItem('mmp_username').then((value) => { this.setState({ usernameValue: value || '' }) });
        AsyncStorage.getItem('mmp_password').then((value) => { this.setState({ passwordValue: value || '' }) });
        AsyncStorage.setItem("@mmp:next_page", 'LoginScreen');
    }

    changeusernameValue = (text: string) => {
        this.setState({ usernameValue: text });
        console.log('usernameValue: ' + this.state.usernameValue);
    }

    changepasswordValue = (text: string) => {
        this.setState({ passwordValue: text });
        console.log('passwordValue: ' + this.state.passwordValue);
    }

    onLoginPressButton = () => {
        console.log('State is: ' + JSON.stringify(this.state));
        this.setState({
            loggingIn: true,
            loginError: false,
            loginErrorMessage: null
        });

        fetch('https://managemyapiclone.azurewebsites.net/Mobile.asmx/AuthRequest', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8;',
                'Data-Type': 'json'
            },
            body: JSON.stringify({
                username: this.state.usernameValue,
                password: this.state.passwordValue,
                device_id: DeviceInfo.getUniqueId()
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.d.auth_result == 0) {
                    AsyncStorage.setItem('@mmp:auth_token', responseJson.d.token);
                    console.log("Auth token is " + responseJson.d.token);
                    AsyncStorage.setItem('@mmp:user_id', responseJson.d.user.user_id.toString());
                    AsyncStorage.setItem('mmp_username', this.state.usernameValue);
                    AsyncStorage.setItem('mmp_password', this.state.passwordValue);
                    this.onClickNavigate('StartPage');
                }
                else {
                    this.setState({
                        loggingIn: false,
                        loginError: true,
                        loginErrorMessage: 'Login failed'
                    });
                }
            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    loggingIn: false,
                    loginError: true,
                    loginErrorMessage: error
                });
            });
    }


    onClickNavigate(routeName: string) {
        const navigateAction = CommonActions.navigate({
            name: routeName,
            params: { username: this.state.usernameValue },
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.logocontainer}>
                    <Image source={require('../../images/MMP.png')} style={styles.logo} />
                </View>
                <View style={styles.loginform}>
                    <TextInput underlineColorAndroid='transparent' defaultValue={this.state.usernameValue.toString().toLocaleLowerCase()} placeholder='Username' style={styles.textinput} autoCapitalize='none' onChangeText={this.changeusernameValue} />
                    <TextInput underlineColorAndroid='transparent' defaultValue={this.state.passwordValue} placeholder='Password' secureTextEntry={true} autoCapitalize='none' style={styles.textinput} onChangeText={this.changepasswordValue} />
                    <TouchableOpacity style={styles.loginbtn} onPress={this.onLoginPressButton}>
                        <Text style={styles.infotext}>Login</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 16 }}>New to MMP? <Text onPress={() => this.onClickNavigate('SignupScreen')} style={{ color: '#00f' }}>Sign up now</Text>.</Text>
                    <ActivityIndicator size="large" color="darkorange" style={{ opacity: this.state.loggingIn ? 1.0 : 0.0, marginTop: 10 }} animating={true} />
                    <Text style={{ color: 'red', fontWeight: 'bold', opacity: this.state.loginError ? 1.0 : 0.0 }}>
                        Login error:
                    </Text>
                    <Text style={{ color: 'red', opacity: this.state.loginErrorMessage != null ? 1.0 : 0.0 }}>
                        {this.state.loginErrorMessage}
                    </Text>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    infotext: {
        fontSize: 20,
        color: 'white'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'stretch',
        width: undefined,
        padding: 20,
        backgroundColor: 'white',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    logocontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        flex: 1,
        width: 300,
        height: 150,
        resizeMode: 'contain'
    },
    loginform: {
        flex: 2,
    },
    loginformcontainer: {
        alignItems: 'center',
    },
    textinput: {
        color: 'white',
        alignSelf: 'stretch',
        padding: 12,
        marginBottom: 10,
        backgroundColor: 'orange',
        borderColor: 'grey',
        borderWidth: 0.8,
        fontSize: 20,
        borderRadius: 3,
    },
    switch: {
        padding: 12,
        marginBottom: 30,
        borderColor: '#fff',
        borderWidth: 0.6,
    },
    text: {
        fontSize: 20,
    },
    loginbtn: {
        backgroundColor: 'darkorange',
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 14,
        marginTop: 10,
        borderColor: 'grey',
        borderWidth: 0.8,
        borderRadius: 10,
        marginBottom: 15,
    },
});