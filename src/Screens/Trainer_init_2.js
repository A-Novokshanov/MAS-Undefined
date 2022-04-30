import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import styles from '../Style/Styles.styles';
import { Formik } from 'formik';
import { makeTrainerProfile } from '../Services/trainerProfileService.js'

/**
 * The screen for the second part of trainer init
 * @route to get the paras from the props
 * @navigation navigation tool
 * @returns the second part of trainer init
 */
const Trainer_init_2 = ({ navigation, route }) => {
    //params from the parents
    const { profile } = route.params;

    //submit handler for the page
    const submit_profile = async (input_notes, profile) => {
        try {
            //get the entered profile from the init1
            let temp = route.params.profile;

            //re-format the profile
            temp = {
                ...temp,
                description: input_notes,
                is_trainer: true
            }

            //firebase update
            await makeTrainerProfile(temp);

            //navigate to MyClients
            navigation.navigate("MyClients", {
                profile: temp
            })
        } catch (e) {
            console.log(e)
        }

    }

    //input field for comment
    const UselessTextInput = (props) => {
        return (
            <TextInput
                {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
                editable
                maxLength={40}
            />
        );
    }

    return (
        <View style={styles.app}>

            <SafeAreaView>
                <Text style={[styles.subtitle]}>
                    Last step...
                    In order to let your customers get to know you better, please introduce yourself and tell me what makes you most attractive!
                </Text>
                <Formik initialValues=
                    {{
                        description: profile.description
                    }}
                    onSubmit={(values, { setFieldValue }) => submit_profile(values.description, profile).catch(error => setFieldValue('error', error.message))}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                        <View>

                            <UselessTextInput
                                multiline
                                numberOfLines={4}
                                style={{ backgroundColor: '#E8E8E8', height: 200, borderRadius: 20 }}
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                value={values.description}
                            />

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

export default Trainer_init_2
