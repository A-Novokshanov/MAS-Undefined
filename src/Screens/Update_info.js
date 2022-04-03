import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, SectionList, Button, Image } from 'react-native'
import styles2 from '../Style/Content_style';
import styles from '../Style/Styles.styles';
import { Formik } from 'formik';
import { CommonActions } from '@react-navigation/native';
import {editProfile} from '../Services/profileService.js'
import {editTrainerProfile} from '../Services/trainerProfileService.js'



const Update_info = (mainProps) => {

  const navigation = mainProps.navigation
  const route = mainProps.route


  const [value, setValue] = React.useState(route.params.input_notes);

  console.log("in update info")
  console.log(mainProps)
    
  const update_profile = async (input_notes, c_type, is_trainer) => {
    try {

      console.log('update profile is called')
            c_type = c_type.toLowerCase();
            console.log(input_notes); // the actual data
          console.log(c_type); // the attribute type
          console.log("in the update profile method")

          //TODO: Update info, new data = input notes, c_type = the type of info
          setValue(input_notes)
          if (is_trainer) {
            await editTrainerProfile(c_type, input_notes)
          } else {
            await editProfile(c_type, input_notes)
          }


            navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    { name: 'Content Page' },
                  ],
                })
              );
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
            <View style={{ flexDirection: 'row' }}>
                    <Button
                        onPress={() => navigation.goBack()}
                        title={"< Profile"}
                    />
                </View>
                <Text style={[styles.subtitle]}>
                    Update My {route.params.c_type}
                </Text>
                <Formik initialValues=
                    {{
                        title: '',
                        email: '',
                        password: '',
                        error: ''
                    }}
                        onSubmit={(values, { setFieldValue }) => update_profile(values.input_notes, route.params.c_type, route.params.is_trainer).catch(error => setFieldValue('error', error.message))}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                        <View>
                            
                            <UselessTextInput
                                multiline
                                numberOfLines={4}
                                style={{backgroundColor: '#E8E8E8', height: 200, borderRadius: 20}}
                                onChangeText={handleChange('input_notes')}
                                onBlur={handleBlur('input_notes')}
                                value={values.input_notes}
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

export default Update_info
