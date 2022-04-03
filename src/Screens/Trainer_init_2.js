import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, SectionList, Button, Image } from 'react-native'
import styles2 from '../Style/Content_style';
import styles from '../Style/Styles.styles';
import { Formik } from 'formik';
import {makeTrainerProfile} from '../Services/trainerProfileService.js'


const Trainer_init_2 = ({ navigation, route }) => {

    const { profile } = route.params;
    
    const submit_profile = async (input_notes, profile) => {
        try {
            let temp = route.params.profile;
            temp = {
                ...temp, 
                introduction : input_notes,
              is_trainer: true
            }


          await makeTrainerProfile(temp);

          
            console.log(temp);
            navigation.navigate("MyClients", {
                profile : temp
            })          
        }catch (e) {
            console.log(e)
        }
        
    }
    
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
                        introduction : profile.introduction
                    }}
                    onSubmit={(values, { setFieldValue }) => submit_profile(values.introduction, profile).catch(error => setFieldValue('error', error.message))}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                        <View>
                            
                            <UselessTextInput
                                multiline
                                numberOfLines={4}
                                style={{backgroundColor: '#E8E8E8', height: 200, borderRadius: 20}}
                                onChangeText={handleChange('introduction')}
                                onBlur={handleBlur('introduction')}
                                value={values.introduction}
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
