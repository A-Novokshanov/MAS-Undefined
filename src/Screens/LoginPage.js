//React dependency
import React from 'react';
import { Formik } from 'formik';
import styles from '../Style/Styles.styles';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import {setTestDeviceIDAsync} from 'expo-ads-admob';
import { checkTrainer } from '../Services/uidService';
import { getTrainerProfile } from '../Services/trainerProfileService';
//firebase dependency
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';


/**
 * Screen for the Login page
 */
export default class LoginPage extends React.Component {
    /**
     * Handle login button, pass email and password to firebase for auth check
     * @param {*} email 
     * @param {*} password 
     * @return navigate to Content page
     */
    async submitLogin(email, password) {

        const auth = getAuth();

        let temp1 = await signInWithEmailAndPassword(auth, email, password)

        // Set global test device ID
        await setTestDeviceIDAsync('device');



      const is_trainer = await checkTrainer(email);
      if (is_trainer) {
        const temp = await getTrainerProfile(auth.uid);
        this.props.navigation.navigate("MyClients", { profile: temp }) // grab the data for a trainer
      } else {
        this.props.navigation.navigate("Content Page", { profile: {email: email} })
      }
        // console.log(temp);
        // console.log('is trainer?' + is_trainer)

    }

    render() {
        return (
            <View style={styles.app}>
                {
                    /**
                     * Form for login, 
                     * @email input stores in values.email
                     * @password input stores in values.password
                     * @return submitLogin(email, password)
                     */
                }
                <View style={styles.home_style}>
                    <Text style={styles.title}>TrainSmart!</Text>
                    <Text style={styles.subtitle}>Presented By Team Undefined</Text>
                    <Image
                        style={{
                            width: 125,
                            height: 125,
                            alignSelf:"center",
                            marginTop: 15
                        }}
                        source={require('../Icon/home.png')}
                    />
                </View>

                <Formik initialValues=
                    {{
                        title: 'Login',
                        email: '',
                        password: '',
                        error: ''
                    }}
                    onSubmit={(values, { setFieldValue }) => this.submitLogin(values.email,
                        values.password).catch(error => setFieldValue('error', error.message))}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                        <View>
                            <Text style={styles.subtitle2}>Please Login!</Text>
                            <TextInput
                                placeholder="E-Mail"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                style={styles.home_but}
                            />
                            <TextInput
                                placeholder="Password"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                style={styles.home_but}
                            />
                            <Text style={styles.error}> {values.error} </Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={(handleSubmit)}>
                                <Text style={styles.generic}> Login </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.props.navigation.navigate("Register Page")}>
                                <Text style={styles.generic}> Register New Account </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
                {
                    /**
                     * @Button navigate to Register Page
                     */
                }
            </View>
        )
    }
}