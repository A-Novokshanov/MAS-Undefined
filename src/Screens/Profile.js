import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, SectionList, Button, Image } from 'react-native'
import styles from '../Style/Content_style'

const Profile = ({ name }) => {


    return (
        <View style={styles.app}>

            <SafeAreaView>
                <Text style={[styles.subtitle, styles.px6]}>
                    Hi, {name}
                </Text>

                <TouchableOpacity
                    style={[styles.pf_button]}
                    onPress={() => navigation.navigate('Chat', {
                        name: name,
                    })}
                >
                    <Text > Name </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.pf_button]}
                >
                    <Text onPress={() => navigation.navigate('Schedule', {
                        name: name
                    })}> Email </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.pf_button]}
                    onPress={() => navigation.navigate('Notes', {
                        name: name,
                    })}
                >
                    <Text > Password </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.pf_button]}
                    onPress={() => navigation.navigate('Notes', {
                        name: name,
                    })}
                >
                    <Text > Payment </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.pf_button]}
                    onPress={() => navigation.navigate('Notes', {
                        name: name,
                    })}
                >
                    <Text > Phone number </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.pf_button]}
                    onPress={() => navigation.navigate('Notes', {
                        name: name,
                    })}
                >
                    <Text > Feedbacks </Text>
                </TouchableOpacity>

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
                    })}
                >
                    <Text > Learn about our App </Text>
                </TouchableOpacity>
                


            </SafeAreaView>
        </View>
    )

}

export default Profile
