import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './src/Screens/LoginPage.js';
import RegisterPage from './src/Screens/RegisterPage.js';
import ContentPage from './src/Screens/ContentPage.js';
import Trainer from './src/Screens/Trainer.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Notes from './src/Screens/Notes.js';
import Chat from './src/Screens/Chat.js';
import Schedule from './src/Screens/Schedule.js';
import MyClients from './src/Screens/MyClients.js';
import Clients from './src/Screens/Clients.js';

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
  appId: "1:63664304153:web:47bb9dea78cb11b814ba88"
};

// Initialize Firebase
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}
const Stack = createStackNavigator();

const LoginStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName="Login Page">
      <Stack.Screen name="Login Page" component={LoginPage} />
      <Stack.Screen name="Trainer" component={Trainer} />
      <Stack.Screen name="Register Page" component={RegisterPage} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Schedule" component={Schedule} />
      <Stack.Screen name="MyClients" component={MyClients} />
      <Stack.Screen name="Clients" component={Clients} />
      <Stack.Screen name="Content Page" component={ContentPage}
        options={({ navigation }) => ({
          title: 'Content page',
          headerLeft: () => (
            <DrawerButton onPress={() => navigation.toggleDrawer()} />
          ),
        })}
      />
      <Stack.Screen name="Notes" component={Notes}
        options={({ navigation }) => ({
          title: 'Notes',
          headerLeft: () => (
            <DrawerButton  onPress={() => navigation.toggleDrawer()} />
          ),
        })}
      />
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