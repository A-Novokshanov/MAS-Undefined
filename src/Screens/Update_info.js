import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Button } from 'react-native'
import styles from '../Style/Styles.styles';
import styles2 from '../Style/Content_style';
import { Formik } from 'formik';
import { CommonActions } from '@react-navigation/native';

//backend dependency
import { editProfile } from '../Services/profileService.js'
import { editTrainerProfile } from '../Services/trainerProfileService.js'
import { changePassword } from '../Services/passwordService';
import { changeEmail } from '../Services/emailService';
import Ads from './Ads';


/**
 * The screen for update profile 
 * @route to get the paras from the props
 * @navigation navigation tool
 * @returns update profile screen
 */
const Update_info = (mainProps) => {

  const navigation = mainProps.navigation
  const route = mainProps.route

  console.log("in update info")
  console.log(mainProps)

  /**
   * form submit handler 
   * @param {*} input_notes the updated value
   * @param {*} c_type the type of data being changed, password/email/phonenumber
   * @param {*} is_trainer whether the user is a trainer
   */
  const update_profile = async (input_notes, c_type, is_trainer) => {
    try {
      //firebase updated process
      console.log('update profile is called')
      c_type = c_type.toLowerCase();
      if (c_type == 'password') {
        await changePassword(input_notes)
      } else {
        if (c_type == 'email') {
          await changeEmail(input_notes)
        }
        if (is_trainer) {
          await editTrainerProfile(c_type, input_notes)
        } else {
          await editProfile(c_type, input_notes)
        }
      }
      //clean the stack and return to Login page
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: 'Login Page' },
          ],
        })
      );
    } catch (e) {
      console.log(e)
    }

  }

  //the input field for updated value
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
    <View style={styles2.container}>

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
                style={{ backgroundColor: '#E8E8E8', height: 200, borderRadius: 20 }}
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
      <Ads></Ads>
    </View>
  )

}

export default Update_info
