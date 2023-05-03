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

type State = {
    usernameValue: string;
    passwordValue: string;
    token: string;
    loggingIn: boolean;
    loginError: boolean;
    loginErrorMessage: string | null;
};

export default class LoginScreen extends React.Component<{}, State> {
    constructor(props: {} | Readonly<{}>) {
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

    changeusernameValue = (text: any) => {
        this.setState({ usernameValue: text });
        //console.log('usernameValue: ' + this.state.usernameValue);
    }

    changepasswordValue = (text: any) => {
        this.setState({ passwordValue: text });
        //console.log('passwordValue: ' + this.state.passwordValue);
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
        }).then((response) => response.json())
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
        const navigateAction = NavigationActions.navigate({
            routeName: routeName,
            params: { username: this.state.username },
        });
        this.props.navigation.dispatch(navigateAction);
    }


}