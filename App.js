import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from './src/Screens/LoginPage.js';
import RegisterPage from './src/Screens/RegisterPage.js';
import ContentPage from './src/Screens/ContentPage.js';
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADrhhiBTqfhEosw5PGc7Zv9vFFYnjyxGQ",
  authDomain: "mas-undefined.firebaseapp.com",
  projectId: "mas-undefined",
  storageBucket: "mas-undefined.appspot.com",
  messagingSenderId: "63664304153",
  appId: "1:63664304153:web:47bb9dea78cb11b814ba88",
  measurementId: "G-PH3WG6DCCV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const Stack = createStackNavigator();

const LoginStack = () => (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
          }} 
        initialRouteName="Login">
        <Stack.Screen name="Login Page" component={LoginPage}/>
        <Stack.Screen name="Register Page" component={RegisterPage} />
        <Stack.Screen name="Content Page" component={ContentPage} />
      </Stack.Navigator>
    </NavigationContainer>
)

export default createAppContainer(
  createSwitchNavigator(
    {
      Login: LoginStack,
    },
    {
      initialRouteName: "Login"
    }
  )
)