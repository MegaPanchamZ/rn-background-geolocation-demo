import React from 'react';
import {
  Linking,
  Platform,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeApp from "./src/home/HomeApp";
import HelloWorldApp from "./src/hello-world/HelloWorldApp";
import AdvancedApp from "./src/advanced/AdvancedApp";

import AsyncStorage from '@react-native-async-storage/async-storage';

const NAVIGATION_KEY = "@transistorsoft:navigation";

const MainStack = createNativeStackNavigator();

// Custom back-button.  react-navigation does something messed up with default goBack() action.
const screenOptions = () => {

  return {
    headerShown: false
  };
}

const App = () => {

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(NAVIGATION_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={(state) => {
        AsyncStorage.setItem(NAVIGATION_KEY, JSON.stringify(state));
      }}
    >
      <MainStack.Navigator
        initialRouteName="HomeApp"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ffffff'
          },
        }}>
        <MainStack.Screen
          name="HomeApp"
          component={HomeApp}
          options={{
            headerShown: false
          }}
        />
        <MainStack.Screen
          name="AdvancedApp"
          component={AdvancedApp}
          options={screenOptions}
        />
        <MainStack.Screen
          name="HelloWorldApp"
          component={HelloWorldApp}
          options={screenOptions}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
