import React from 'react';
import * as firebase from '@firebase/app'
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth'
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import { Formik } from 'formik';
import styles from '../Style/Styles.styles';

export default class LoginPage extends React.Component {

    submitLogin(email, password) {
        console.log(email + " " + password)
        const auth = getAuth();
        signInWithEmailAndPassword(email, password)
    }
    render() {
        return (
            <View style={styles.app}>
            <View style={styles.container}>
                <Text style={styles.generic}>CS 4261 - Programming Assignment 1</Text>
                <Text style={styles.title}>Cryptocurrency Price Tracker</Text>
                </View>
            <Formik initialValues = 
                {{title: 'Login',
                email: '',
                password: '',
                error: '2'
                }}
                onSubmit = {values => submitLogin(values.email, values.password).catch(error => setFieldValue('error', error.message))}
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
                    <Text style={styles.generic}> Login </Text>
                    </TouchableOpacity>
                </View>
            )}
            </Formik>
            <TouchableOpacity 
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate("Register Page")}>
                    <Text style={styles.generic}> Register New Account </Text>
                    </TouchableOpacity>
            </View>
        )
    }
}