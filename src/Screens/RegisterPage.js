import React from 'react';
import * as firebase from '@firebase/app'
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth'
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import { Formik } from 'formik';
import styles from '../Style/Styles.styles';

export default class RegisterPage extends React.Component{

    async submitRegister(email, password) {
        console.log(email + " HELLO " + password)
        const auth = getAuth();

        await createUserWithEmailAndPassword(auth, email, password)
        this.props.navigation.navigate("Content Page")
    }

    render() {
        return (
            <View style={styles.app}>
            <View style={styles.container}>
                <Text style={styles.subtitle}>CS 4261 - Programming Assignment 1</Text>
                <Text style={styles.title}>Cryptocurrency Price Tracker</Text>
                <Text style={styles.subtitle}>Register a new account</Text>
                </View>
            <Formik initialValues = 
                {{title: 'Login',
                email: '',
                password: '',
                error: '2'
                }}
                onSubmit = {values => this.submitRegister(values.email, values.password).catch(error => console.log("hehe " + error.message)/*setFieldValue('error', error.message)*/)}
            >
                {({handleChange, handleBlur, handleSubmit, values}) => (
                <View style={styles.container}>
                    <Text style={styles.container}> E-Mail: </Text>
                    <TextInput 
                        placeholder="Input E-Mail" 
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        style={styles.input}
                    />
                    <Text style={styles.container}> Password: </Text>
                    <TextInput 
                        placeholder="Input Password" 
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        style={styles.input}
                    />
                    <Text style={styles.error}>{values.error}  </Text>
                    <TouchableOpacity 
                    style={styles.button}
                    onPress={handleSubmit}>
                    <Text style={styles.generic}> Register </Text>
                    </TouchableOpacity>
                </View>
            )}
            </Formik>
            <TouchableOpacity 
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate("Login Page")}>
                    <Text style={styles.generic}> Return to Login Page </Text>
                    </TouchableOpacity>
            </View>
        )
    }
}