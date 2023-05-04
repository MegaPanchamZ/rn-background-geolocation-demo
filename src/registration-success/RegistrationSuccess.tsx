import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    ImageBackground,
    ScrollView,
    ActivityIndicator,
    Linking
} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { CommonActions } from '@react-navigation/native';

type MyProps = { navigation: any };

type MyState = {
    usernameValue: string,
    passwordValue: string,
    token: string,
    jobList: any[],
    jobListLoaded: boolean,
    welcomeMessage: string
};


export default class RegistrationSuccess extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        let navigation = props.navigation;
        this.state = {
            usernameValue: '',
            passwordValue: '',
            token: '',
            jobList: [],
            jobListLoaded: false,
            welcomeMessage: 'Welcome to MMP'
        }

        // AsyncStorage.getItem('mmp_username').then((value) => {this.setState({usernameValue: value.toString().toLowerCase()})});

        AsyncStorage.setItem("@mmp:next_page", 'StartPage');
    }

    async componentDidMount() {
        AsyncStorage.getItem('@mmp:first_name').then((value) => { this.setState({ welcomeMessage: 'Welcome to MMP, ' + value }) });
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
            <ImageBackground source={require('../../images/MMP.png')} style={styles.container}>
                <View style={styles.loginform}>
                    <Text style={styles.h3}>
                        {this.state.welcomeMessage}
                    </Text>

                    <Text>
                        Your registration was successful. <Text onPress={() => Linking.openURL("http://managemypost.com/support/")} style={{ color: '#00f' }}>Click here</Text> to get info about getting started with MMP, or press "OK" to start tracking.
                    </Text>

                    <TouchableOpacity style={styles.loginbtn} onPress={() => this.onClickNavigate('SimpleMap')}>
                        <Text style={styles.infotext}>OK</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
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
        padding: 10,
        backgroundColor: 'white',
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
    textinput: {
        fontSize: 18,
        fontWeight: "600",
        height: 50,
        color: 'white',
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 14,
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 25,
        backgroundColor: 'rgba(255, 165, 00, 0.4)',
        borderColor: '#fff',
        borderWidth: 0.6,
        borderRadius: 10,
        justifyContent: 'flex-start',
    },
    loginform: {
        flex: 2,
    },
    h3: {
        fontSize: 28
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
    },
});
