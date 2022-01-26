import React, { useState, useEffect } from 'react';
import * as firebase from '@firebase/app'
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView} from 'react-native'
import { Formik } from 'formik';
import styles from '../Style/Styles.styles'
import ListItem from '../Components/ListItem'
import { SAMPLE_DATA } from '../../assets/data/sampleData';
import {getMarketData} from '../Services/cryptoService';

const ContentPage = () => {

    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchMarketData = async () => {
            const marketData = await getMarketData();
            setData(marketData);
        }

        const interval = setInterval(() => {
            fetchMarketData()
        }, 10000)

        return () => clearInterval(interval)
    }, [])
    return (
        <View style={styles.app}>
            <SafeAreaView style={styles.container}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.subtitle}>Markets</Text>
                </View>
                <View style={styles.divider} />

                <FlatList
                    keyExtractor={(item) => item.id}
                    data={data}
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
        </View>
    )
}

export default ContentPage
