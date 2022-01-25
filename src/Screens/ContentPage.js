import React from 'react'
import * as firebase from '@firebase/app'
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView} from 'react-native'
import { Formik } from 'formik';
import styles from '../Style/Styles.styles'
import ListItem from '../Components/ListItem'

export default class ContentPage extends React.Component {
    async submitLogin(email, password) {
        console.log(email + " HELLO " + password)
        const auth = getAuth();

        await signInWithEmailAndPassword(auth, email, password)
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.subtitle}>Markets</Text>
                </View>
                <View style={styles.divider} />

                <ListItem />
            </View>
        )
    }
}
