//React libs
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
// Screen components
import LoginPage from './src/Screens/LoginPage.js';
import RegisterPage from './src/Screens/RegisterPage.js';
import ContentPage from './src/Screens/ContentPage.js';
import Trainer from './src/Screens/Trainer.js';
import Notes from './src/Screens/Notes.js';
import Chat from './src/Screens/Chat.js';
import Schedule from './src/Screens/Schedule.js';
import MyClients from './src/Screens/MyClients.js';
import Clients from './src/Screens/Clients.js';
import Trainer_init from './src/Screens/Trainer_init.js';
import Trainer_init_2 from './src/Screens/Trainer_init_2.js';
import Update_info from './src/Screens/Update_info.js';
import Reviews from './src/Screens/Reviews.js';
import New_review from './src/Screens/New_review.js';
import Payment from './src/Screens/Payment.js';
//Firebase libs
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


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

/**
 * App screen stack and page controller
 * (Trainer/Client)Login Page : LoginPage.js - Login related content
 * (Trainer/Client)Payment: Payment.js
 * (Trainer/Client)Content Page: ContentPage.js
 * (Trainer/Client)Register Page: RegisterPage.js - Register realated content
 * (Trainer/Client)Chat: Chat.js - The chat screen between the client and trainer
 * (Trainer/Client)Schedule: Schedule.js - The Schedule component 
 * (Trainer/Client)Update_info: Update_info.js
 * (Trainer/Client)Reviews: Review.js
 * (Trainer)Trainer_init: Trainer_init.js
 * (Trainer)Trainer_init_2: Trainer_init_2.js
 * (Trainer)Clients: Clients.js
 * (Trainer)MyClients: MyClients.js - The screen that shows all the clients of a trainer
 * (Client)New_Review: New_Review.js
 * (Client)Trainer: Trainer.js - The page about the trainer's profile
 */
const Stack = createStackNavigator();


const LoginStack = () => (
  <NavigationContainer>
    
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      //Initial page set to Login page
      initialRouteName="Login Page">
      <Stack.Screen name="Login Page" component={LoginPage} />
      <Stack.Screen name="Trainer" component={Trainer} />
      <Stack.Screen name="Register Page" component={RegisterPage} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Schedule" component={Schedule} />
      <Stack.Screen name="MyClients" component={MyClients} />
      <Stack.Screen name="Update_info" component={Update_info} />
      <Stack.Screen name="Reviews" component={Reviews} />
      <Stack.Screen name="Trainer_init" component={Trainer_init} />
      <Stack.Screen name="Trainer_init_2" component={Trainer_init_2} />
      <Stack.Screen name="Clients" component={Clients} />
      <Stack.Screen name="New_Review" component={New_review} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Content Page" component={ContentPage} />
      <Stack.Screen name="Notes" component={Notes} />
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