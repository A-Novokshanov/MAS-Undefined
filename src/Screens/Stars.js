import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, SectionList, Button, Image } from 'react-native'
import styles from '../Style/Content_style'
import { Formik } from 'formik';


const Stars = ({ route, rate }) => {


    let page = [];
    for (let i = 0; i < Math.ceil(rate); i++) {
        page.push(
            <Image
                style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                }}
                source={require('../Icon/star.png')}
            />
        )
    }


    return (

        <View style={{ flexDirection: 'row'}}>
            <Text>
                {page}
            </Text>
            

        </View>
    )

}

export default Stars
