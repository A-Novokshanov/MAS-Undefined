import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, SectionList, Button, Image } from 'react-native'
import styles2 from '../Style/Content_style';
import styles from '../Style/Styles.styles';
import { Formik } from 'formik';
import { CommonActions } from '@react-navigation/native';




const Update_info = ({ navigation, route }) => {

    
    const update_profile = async (input_notes, c_type) => {
        try {
            c_type = c_type.toLowerCase();
            console.log(input_notes);
            console.log(c_type);

            //TODO: Update info, new data = input notes, c_type = the type of info


            navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    { name: 'Login Page' },
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
                    onSubmit={(values, { setFieldValue }) => update_profile(values.input_notes, route.params.c_type).catch(error => setFieldValue('error', error.message))}
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
