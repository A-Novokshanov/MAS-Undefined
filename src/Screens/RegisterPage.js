import React from 'react';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch } from 'react-native'
import { Formik } from 'formik';
import styles from '../Style/Styles.styles';

export default class RegisterPage extends React.Component {

    async submitRegister(email, password) {

        const auth = getAuth();
        console.log('test')
        await createUserWithEmailAndPassword(auth, email, password)
        this.props.navigation.navigate("Content Page")
    }

    render() {
        return (
            <View style={styles.app}>
                <View style={styles.container}>
                    <Text style={styles.subtitle}>CS 4261 - Team Undefined</Text>
                    <Text style={styles.title}>Personal Trainer Portal</Text>
                    <Text style={styles.subtitle}>Register a New Account</Text>
                </View>

                <Formik initialValues=
                    {{
                        title: 'Register',
                        email: '',
                        password: '',
                        error: '',
                        trianer: false
                    }}
                    onSubmit={(values, { setFieldValue }) => this.submitRegister(values.email, values.password).catch(error => setFieldValue('error', error.message))}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
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
                            <Text style={[styles.py12]}>
                                <Switch
                                    onValueChange={value =>
                                        setFieldValue('trianer', value)
                                    }
                                    value={values.trianer}
                                />
                                I am a trainer
                            </Text>
                            
                            <Text style={styles.error}> {values.error} </Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={(handleSubmit)}>
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