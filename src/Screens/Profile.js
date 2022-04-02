import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, SectionList, Button, Image } from 'react-native'
import styles from '../Style/Content_style'

const Profile = ({ navigation, name, is_trainer, profile }) => {


    return (
        <View style={styles.app}>

            <SafeAreaView>
                <Text style={[styles.subtitle, styles.px6]}>
                    Hi, {profile.name}
                </Text>

                <TouchableOpacity
                    style={[styles.pf_button]}
                    onPress={() => navigation.navigate('Update_info', {
                        c_type: "Name",
                        value: profile.name
                    })}
                >
                    <Text > Name </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.pf_button]}
                >
                    <Text onPress={() => navigation.navigate('Update_info', {
                        c_type: "Email",
                        value: profile.email
                    })}> Email </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.pf_button]}
                    onPress={() => navigation.navigate('Update_info', {
                        c_type: "Password",
                        value: profile.password
                    })}
                >
                    <Text > Password </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.pf_button]}
                    onPress={() => navigation.navigate('Update_info', {
                        c_type: "Payment",
                        value: profile.payment
                    })}
                >
                    <Text > Payment </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.pf_button]}
                    onPress={() => navigation.navigate('Update_info', {
                        c_type: "phone",
                        value: profile.phone
                    })}
                >
                    <Text > Phone Number </Text>
                </TouchableOpacity>

                {is_trainer ?
                    <View>
                        <TouchableOpacity
                            style={[styles.pf_button]}
                            onPress={() => navigation.navigate('Reivews', {
                                profile: profile,
                                is_trainer: true
                            })}
                        >
                            <Text > View my reviews </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.pf_button]}
                            onPress={() => navigation.navigate('Trainer', {
                                profile: profile,
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
