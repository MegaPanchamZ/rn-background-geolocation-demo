import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';


import Home from './home/HomeApp';
import HelloWorld from './hello-world/HelloWorldApp';
import SimpleMap from './simple-map/SimpleMap';
import AdvancedApp from './advanced/AdvancedApp';
import LoginScreen from './loginscreen/loginscreen';
import SignupScreen from './sign-up/signup'
import StartPage from './startpage/StartPage';
import RegistrationSuccess from './registration-success/RegistrationSuccess';
import { ScreenStackHeaderConfig } from 'react-native-screens';

type Props = {
  navigation: any;
};

class Root extends Component <Props> {  
  componentDidMount() {
    let navigation = this.props.navigation;

    // Fetch current routeName (ie: HelloWorld, SimpleMap, Advanced)
    AsyncStorage.getItem("@transistorsoft:initialRouteName", (err, page) => {
      let params: {
        username?: string;
      } = {};
      if (!page) {
        // Default route:  Home
        page = "HomeApp";
        // AsyncStorage.setItem("@transistorsoft:initialRouteName", page);
        AsyncStorage.setItem("@transistorsoft:initialRouteName", "HomeApp");
      }

      AsyncStorage.getItem('@mmp:next_page', (err, item) => {
        if (!item) {
          AsyncStorage.setItem("@mmp:next_page", "StartPage");
        }
      });

      // Append username to route params.
      page = "HomeApp";
      AsyncStorage.getItem("@transistorsoft:username", (err, username) => {
        // Append username to route-params
        if (typeof username === "string") {
          params.username = username;
        }
        let action = StackActions.replace(page, params);
        navigation.dispatch(action);
      });
    });
  }
  render() {
    return (<View></View>);
  }
}


const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Root">
        <Stack.Screen name="Root" component={Root} />
        <Stack.Screen name="HomeApp" component={Home} />
        <Stack.Screen name="HelloWorldApp" component={HelloWorld} />
        <Stack.Screen name="SimpleMap" component={SimpleMap} />
        <Stack.Screen name="AdvancedApp" component={AdvancedApp} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="RegistrationSuccess" component={RegistrationSuccess} />
        <Stack.Screen name="StartPage" component={StartPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;