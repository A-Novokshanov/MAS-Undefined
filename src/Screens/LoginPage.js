import React from 'react';
import {Text, View} from 'react-native';
import { Formik } from 'formik';
import styles from '../Style/Styles.styles';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Input } from 'react-native-elements/dist/input/Input';

export default function LoginPage () {

    function submitLogin(email, password) {
        console.log(email + " " + password)
        firebase.default.auth().signInWithEmailAndPassword(email, password).catch(error => this.setState({errorMessage: error.message}))
    }
    return (
        <View style={styles.app}>
        <View style={styles.container}>
            <Text style={styles.generic}>CS 4261 - Programming Assignment 1</Text>
            <Text style={styles.title}>Cryptocurrency Price Tracker</Text>
            </View>
        <Formik initialValues = 
            {{title: 'Login'}}
            onSubmit = {values => submitLogin(values.email, values.password)}
        >
            {({handleChange, handleBlur, handleSubmit, values}) => (
            <View style={styles.container}>
                <Text> E-Mail: </Text>
                <Input 
                    placeholder="Input E-Mail" 
                    onChangeText={handleChange('E-Mail')}
                    onBlur={handleBlur('E-Mail')}
                    value={values.email}
                    style={styles.input}
                />
                <Text> Password: </Text>
                <Input 
                    placeholder="Input Password" 
                    onChangeText={handleChange('Password')}
                    onBlur={handleBlur('Password')}
                    value={values.password}
                    style={styles.input}
                />
                <Button title="Login" onPress={handleSubmit} style={styles.button} />
            </View>
        )}
        </Formik>

        </View>
    )
}