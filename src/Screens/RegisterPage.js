import React from 'react';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import styles from '../Style/Styles.styles';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { makeProfile } from '../Services/profileService.js';
import Ads from './Ads';
/**
 * Screen for the Login page
 */
export default class RegisterPage extends React.Component {
    /**
     * Handle submitRegister, create a new user on firebase
     * @email email
     * @password password
     * @return navigate to Content page
     */
    async submitRegister(email, password, is_trainer) {
        //getAuth for the firebase
        const auth = getAuth();

        // TODO: - 2 collections, one for trainers, one for clients
        await createUserWithEmailAndPassword(auth, email, password);
        //if its a client, make the profile for the client on the firebase
        if (!is_trainer) {
            console.log(is_trainer);
            await makeProfile(email, '');
        }

        //set the init profile for client
        let temp_data = {
            email: email,
            name: "User",
            password: password,
            payment: "",
            phone: ""
        }

        //is_trainer is true then nav to trainer_init, otherwise to content page
        is_trainer ? this.props.navigation.navigate("Trainer_init", { profile: { email: email } }) // grab the data for a trainer
            : this.props.navigation.navigate("Content Page", { profile: temp_data })
    }

    render() {
        return (
            <View style={styles.app}>
                <View style={styles.home_style}>
                    <Text style={styles.title}>TrainSmart!</Text>
                    <Text style={styles.subtitle}>Presented By Team Undefined</Text>
                    <Image
                        style={{
                            width: 55,
                            height: 55,
                            alignSelf: "center",
                            marginTop: 15
                        }}
                        source={require('../Icon/home.png')}
                    />
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
                            <Text style={styles.subtitle2}>Register a New Account!</Text>
                            <TextInput
                                placeholder="Input E-Mail"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                style={styles.home_but}
                            />
                            <TextInput
                                placeholder="Input Password"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                style={styles.home_but}
                            />
                            <Text style={{ marginTop: 15 }}>

                                <BouncyCheckbox
                                    onPress={(isChecked) => {
                                        console.log(isChecked);

                                        setFieldValue('is_trianer', isChecked)
                                    }}
                                    textStyle={{
                                        fontSize: 20,
                                        fontWeight: "bold",
                                        color: 'grey',
                                        textAlign: "center",
                                        textDecorationLine: "none",
                                    }}
                                    text="I am a trainer"
                                />

                            </Text>
                            {values.error ? <Text style={styles.error}> {values.error} </Text> : <View></View>}

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