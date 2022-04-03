import React from 'react';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch } from 'react-native'
import { Formik } from 'formik';
import styles from '../Style/Styles.styles';
<<<<<<< HEAD
import BouncyCheckbox from "react-native-bouncy-checkbox";

=======
import {newNotes, getUserNotes, makeNewNote, removeNote} from '../Services/notesService.js'
import {makeTrainerProfile} from '../Services/trainerProfileService.js'
import {makeProfile} from '../Services/profileService.js'
>>>>>>> 4a92d662ddcfa6231819119d9936eaf744e4582a

export default class RegisterPage extends React.Component {

    async submitRegister(email, password, is_trainer) {

        const auth = getAuth();
      console.log('test');

      // TODO: - 2 collections, one for trainers, one for clients
      await createUserWithEmailAndPassword(auth, email, password);

      if (!is_trainer) {
        await makeProfile(email, '');
      }


        let temp_data = {
            email : email,
            name : "User",
            password : password,
            payment : "",
            phone: ""
        }
        is_trainer ? this.props.navigation.navigate("Trainer_init", {profile : {email : email}}) // grab the data for a trainer
            : this.props.navigation.navigate("Content Page", {profile : temp_data})  
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
                        is_trianer: false
                    }}
                    onSubmit={(values, { setFieldValue }) => this.submitRegister(values.email, values.password, values.is_trianer).catch(error => setFieldValue('error', error.message))}
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
                                {/* <Switch
                                    onValueChange={value =>
                                        setFieldValue('is_trianer', value)
                                    }
                                    value={values.is_trianer}
                                /> */}
                                <BouncyCheckbox
                                    onPress={(isChecked) => {
                                        console.log(isChecked);
        
                                        setFieldValue('is_trianer', isChecked)
                                    }}
                                    textStyle={{
                                        height: 20,
                                        textDecorationLine: "none",
                                    }}
                                    text="I am a trainer"
                                />
                                
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