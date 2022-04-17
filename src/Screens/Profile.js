import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, SectionList, Button, Image } from 'react-native'
import styles from '../Style/Content_style'

import {getProfile} from '../Services/profileService.js'
import {getTrainerProfile} from '../Services/trainerProfileService.js'

const Profile = ({ navigation, name, is_trainer, profile }) => {

  // console.log("profile screen")
  // console.log(profile)
  // console.log(is_trainer)

  const [profile_data, setProfile] = useState(profile);

  useEffect(() => {
    const fetchData = async () => {

      try {
        if (is_trainer) {
          const data = await getTrainerProfile()
          setProfile(data)
        } else {
          const data = await getProfile()
          setProfile(data)
        }
      } catch (e) {
        console.log(e)
      }
    }

    fetchData();
  }, []);


    return (
        <View style={styles.app}>

            <SafeAreaView>
                <Text style={[styles.subtitle, styles.px6]}>
                    Hi, {profile_data.username}
                </Text>

                <TouchableOpacity
                    style={[styles.pf_button]}
                    onPress={() => navigation.navigate('Update_info', {
                        c_type: "username",
                      value: profile_data.username,
                      is_trainer: is_trainer
                    })}
                >
                  <Text > Name: {profile_data.username} </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.pf_button]}
                >
                    <Text onPress={() => navigation.navigate('Update_info', {
                        c_type: "email",
                        value: profile_data.email,
                      is_trainer: is_trainer
                    })}> Email: {profile_data.email}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.pf_button]}
                    onPress={() => navigation.navigate('Update_info', {
                        c_type: "Password",
                        value: profile_data.password,
                      is_trainer: is_trainer
                    })}
                >
                    <Text > Password </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.pf_button]}
                    onPress={() => navigation.navigate('Update_info', {
                        c_type: "Payment",
                        value: profile_data.payment,
                      is_trainer: is_trainer
                    })}
                >
                    <Text > Payment </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.pf_button]}
                    onPress={() => navigation.navigate('Update_info', {
                        c_type: "phone",
                        value: profile_data.phone,
                      is_trainer: is_trainer
                    })}
                >
                    <Text > Phone Number </Text>
                </TouchableOpacity>

                {is_trainer ?
                    <View>
                        <TouchableOpacity
                            style={[styles.pf_button]}
                            onPress={() => navigation.navigate('Reviews', {
                                profile: profile_data,
                                is_trainer: true
                            })}
                        >
                            <Text > View my reviews </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.pf_button]}
                            onPress={() => navigation.navigate('Trainer', {
                                profile: profile_data,
                                is_trainer: true
                            })}
                        >
                            <Text > Check my Profile Page </Text>
                        </TouchableOpacity>
                    </View> : <View></View>
                }



                <Text style={[styles.subtitle, styles.px6]}>
                    Support
                </Text>
                <TouchableOpacity
                    style={[styles.pf_button]}
                    onPress={() => navigation.navigate('Notes', {
                        name: name,
                    })}
                >
                    <Text > App feedback </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.pf_button]}
                    onPress={() => navigation.navigate('Notes', {
                        name: name,
                    })
                    }
                >
                    <Text > Learn about our App </Text>
                </TouchableOpacity>



            </SafeAreaView>
        </View>
    )

}

export default Profile
