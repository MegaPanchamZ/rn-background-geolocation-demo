import React, { Component } from 'react';
import {
    View,
    StatusBar
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import Navigator from './Navigator';

export default class App extends Component {
    /**
    * Helper method for resetting the router to Home screen
    */
    static goHome({navigation}) {
        AsyncStorage.setItem("@transistorsoft:initialRouteName", 'LoginScreen');
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [
                { name: 'LoginScreen', params: navigation.state.params }
            ],
        });
        navigation.dispatch(resetAction);
    }

    static setRootRoute(routeName: string) {
        AsyncStorage.setItem("@transistorsoft:initialRouteName", routeName);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor="darkorange"
                    barStyle="light-content"
                />
                <Navigator
                    initialRoute={{ statusBarHidden: true }}
                    renderScene={(route: { statusBarHidden: boolean | undefined; }, navigator: any) =>
                        <View>
                            <StatusBar hidden={route.statusBarHidden} />
                        </View>
                    }
                />
            </View>
        );
    }
}
