import React, { Component } from "react";

import { Text, TextInput, View, ActivityIndicator, StyleSheet } from "react-native";
import AppNavigator from "./Navigation/AppNavigator";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { IconButton, MD3Colors, Button, Modal, Portal, PaperProvider, Divider, MD3LightTheme as DefaultTheme, } from 'react-native-paper';
import { realmContext } from "../lib/RealmSchema";

import { NavigationContainer } from '@react-navigation/native';
import store from '../src/app/store'
import { Provider } from 'react-redux'

const {RealmProvider} = realmContext;

// Define your object model

const myNavigationTheme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,

  colors: {
    ...DefaultTheme.colors,
    // notification: 'rgba(255, 255, 255, 0.5)',
    secondaryContainer: 'transparent',
  },
};

const LoadingIndicator = () => {
  return (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RealmProvider 
      //  sync={{
      //   flexible: true,
      //   onError: (_, error) => {
      //     // Show sync errors in the console
      //     console.log(error);
      //   },
      // }}
      fallback={LoadingIndicator}
      >
        <Provider store={store}>
      <PaperProvider theme={myNavigationTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            
            <AppNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
      </PaperProvider>
      </Provider>
      </RealmProvider>

    );
  }
}


const styles = StyleSheet.create({
  footerText: {
    fontSize: 12,
    textAlign: 'center',
  },
  footer: {
    padding: 24,
  },
  activityContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
