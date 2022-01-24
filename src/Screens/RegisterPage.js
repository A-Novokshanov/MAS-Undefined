import React from 'react';
import * as firebase from '@firebase/app'
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth'
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import { Formik } from 'formik';
import styles from '../Style/Styles.styles';

export default class RegisterPage extends React.Component{

    render() {
        return (
            <View>
                <Text>Register!</Text>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate("Login Page")}>
                    <Text style={styles.generic}> Return to Log in Page </Text>
                </TouchableOpacity>
            </View>
        )
    }
}