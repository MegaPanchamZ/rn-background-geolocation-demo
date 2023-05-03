import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  Button,
  Icon
} from 'react-native-elements'

import BackgroundGeolocation from "../react-native-background-geolocation";

import HomeView from './HomeView';
import SettingsView from "./SettingsView";
import GeofenceView from "./GeofenceView";

const Stack = createNativeStackNavigator();

const AdvancedApp = ({route, navigation}) => {

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        title: 'BGGeolocation Demo',
        headerStyle: {
          backgroundColor: '#fedd1e'
        },
        headerLeft: () => (
          <Button
            type="clear"
            onPress={() => {
              navigation.goBack()
            }}
            icon={<Icon name='home-sharp' type='ionicon' tvParallaxProperties={undefined} /> }
          />
        )
      }}>
      <Stack.Screen
        name="Home"
        component={HomeView}
        initialParams={route.params}
      />
      <Stack.Group
        screenOptions={({ navigation }) => ({
        presentation: 'modal',
        title: 'Stack.Group.title',
        headerLeft: () => (
          <Button
            type="clear"
            onPress={() => {
              navigation.goBack()
            }}
            icon={<Icon name='close-sharp' type='ionicon' tvParallaxProperties={undefined} /> }
          />
        )
      })}>
        <Stack.Screen
          name="Settings"
          component={SettingsView}
        />
        <Stack.Screen
          name="Geofence"
          component={GeofenceView}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default AdvancedApp;