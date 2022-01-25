import React from 'react'
import * as firebase from '@firebase/app'
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView} from 'react-native'
import { Formik } from 'formik';
import styles from '../Style/Styles.styles'
import ListItem from '../Components/ListItem'

import { SAMPLE_DATA } from '../../assets/data/sampleData'

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

                <ListItem
                    name={SAMPLE_DATA[0].name}
                    abbr={SAMPLE_DATA[0].symbol}
                    currentPrice={SAMPLE_DATA[0].current_price}
                    percentage7day={SAMPLE_DATA[0].price_change_percentage_7d_in_currency}
                    logoUrl={SAMPLE_DATA[0].image}
                />
            </View>
        )
    }
}
