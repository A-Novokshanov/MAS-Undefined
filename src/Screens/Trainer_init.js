import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, SectionList, Button, Image } from 'react-native'
import styles from '../Style/Content_style'

const Trainer_init = ({ name }) => {
    const submitInfo = async (values) => { 
        console.log(values)
        this.props.navigation.navigate("Trainer_init_2")
    }

    return (
        <View style={styles.app}>

            <SafeAreaView>
                <Text style={[styles.subtitle, styles.px6]}>
                    Trainer Registration
                </Text>
                <Formik initialValues=
                    {{
                        title: 'Trainer_info_1',
                        name,
                        email: '',
                        address: '',
                        time_exp: '',
                        price: '',
                        is_friendly: '',
                        specialization: '',
                        certificate: ''
                    }}
                    onSubmit={(values, { setFieldValue }) => submitInfo(values).catch(error => alert(error.message))}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                        <View style={styles.container}>
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
                                onChangeText={handleChange('time_exp')}
                                onBlur={handleBlur('time_exp')}
                                value={values.time_exp}
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
                            <View style={styles.input}>
                                <Text style={styles.container}> My specialization </Text>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.generic}> Upload </Text>
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
