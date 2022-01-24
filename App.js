import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from './src/Screens/LoginPage.js';
import RegisterPage from './src/Screens/RegisterPage.js';
import ContentPage from './src/Screens/ContentPage.js';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARCcBbAJdYul-Q6HeT5-U1qbAjOwBjwas",
  authDomain: "cs4261-programming-1.firebaseapp.com",
  projectId: "cs4261-programming-1",
  storageBucket: "cs4261-programming-1.appspot.com",
  messagingSenderId: "900136710049",
  appId: "1:900136710049:web:c966a0a5604bd32f7265e0",
  measurementId: "G-FFTL7MG87D"
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