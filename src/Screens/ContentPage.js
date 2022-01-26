import React, { useState } from 'react';
import * as firebase from '@firebase/app'
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView} from 'react-native'
import { Formik } from 'formik';
import styles from '../Style/Styles.styles'
import ListItem from '../Components/ListItem'
import { SAMPLE_DATA } from '../../assets/data/sampleData'

const ContentPage = () => {

    const [data, setData] = useState([]);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleWrapper}>
                <Text style={styles.subtitle}>Markets</Text>
            </View>
            <View style={styles.divider} />

            <FlatList
                keyExtractor={(item) => item.id}
                data={SAMPLE_DATA}
                renderItem={({ item }) => (
                    <ListItem
                        name={item.name}
                        abbr={item.symbol}
                        currentPrice={item.current_price}
                        percentage7day={item.price_change_percentage_7d_in_currency}
                        logoUrl={item.image}
                    />
                )}
            />
        </SafeAreaView>
    )
}

export default ContentPage
