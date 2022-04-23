import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView} from 'react-native'
import styles2 from '../Style/Content_style';
import styles from '../Style/Styles.styles';
import { Formik } from 'formik';


/**
 * The screen for the first part of trainer init
 * @route to get the paras from the props
 * @navigation navigation tool
 * @returns the first part of trainer init
 */
const Trainer_init = ({ navigation, route }) => {
    //params from the parents
    const { profile } = route.params;

    //submit handler for the page
    const submitInfo = async (values, profile) => { 
        //pass the entered content to Trainer_init_2
        navigation.navigate("Trainer_init_2", {
            profile : {
                ...values, 
                introduction : profile.introduction
            }
        })
    }

    return (
        <View style={styles.app}>

            <SafeAreaView>
                <Text style={[styles.subtitle]}>
                    Trainer Registration
                </Text>
                <Formik initialValues=
                    {{
                        title: 'Trainer_info_1',
                        name: profile? profile.name : '',
                        email: profile? profile.email : '',
                        address: profile? profile.address : '',
                        exp: profile? profile.exp : '',
                      price: profile? number(profile.price) : 0,
                        is_friendly: profile? profile.is_friendly : false,
                        specialization: profile? profile.specialization : '',
                        certificate: profile? profile.certificate : ''
                    }}
                    onSubmit={(values, { setFieldValue }) => submitInfo(values, profile).catch(error => alert(error.message))}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                        <View>
                            <Text style={styles.container}> Name: </Text>
                            <TextInput
                                placeholder="Please Enter Name"
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                style={styles.input}
                            />
                            <Text style={styles.container}> Email: </Text>
                            <TextInput
                                placeholder="Please Enter Email"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                style={styles.input}
                            />
                            <Text style={styles.container}> Address: </Text>
                            <TextInput
                                placeholder="Please Enter Address"
                                onChangeText={handleChange('address')}
                                onBlur={handleBlur('address')}
                                value={values.address}
                                style={styles.input}
                            />
                            <Text style={styles.container}> How long have you been a trainer? </Text>
                            <TextInput
                                placeholder="How long have you been a trainer?"
                                onChangeText={handleChange('exp')}
                                onBlur={handleBlur('exp')}
                                value={values.exp}
                                style={styles.input}
                            />
                            <Text style={styles.container}> Estimated price for one lesson </Text>
                            <TextInput
                                placeholder="Estimated price for one lesson"
                                onChangeText={handleChange('price')}
                                onBlur={handleBlur('price')}
                                value={values.price}
                                style={styles.input}
                            />
                            <Text style={styles.container}> Beginner Friendly? </Text>
                            <TextInput
                                placeholder="Beginner Friendly?"
                                onChangeText={handleChange('is_friendly')}
                                onBlur={handleBlur('is_friendly')}
                                value={values.is_friendly}
                                style={styles.input}
                            />
                            <Text style={styles.container}> My specialization </Text>
                            <TextInput
                                placeholder="My specialization"
                                onChangeText={handleChange('specialization')}
                                onBlur={handleBlur('specialization')}
                                value={values.specialization}
                                style={styles.input}
                            />
                            <View >
                                <Text style={styles.container}> Please upload your trainer's certificate(optional) </Text>
                                <TouchableOpacity style={styles2.tab_button}>
                                    <Text> Upload </Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={(handleSubmit)}>
                                <Text style={styles.generic}> Next </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
                


            </SafeAreaView>
        </View>
    )

}

export default Trainer_init
