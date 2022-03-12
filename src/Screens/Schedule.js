import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, SectionList, Button, Image } from 'react-native'
import styles from '../Style/Content_style'
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';


const onDateChange = () => (
    console.log('coool')
);


const Schedule = ({ route, navigation }) => {

    const { name, exp, review, miles, notes } = route.params;
    let today = moment();
    let day = today.clone().startOf('month');
    let customDatesStyles = [];
    while (day.add(5, 'day').isSame(today, 'month')) {
        customDatesStyles.push({
            date: day.clone(),
            // Random colors
            style: { backgroundColor: '#ABD7F9' },
            allowDisabled: true, // allow custom style to apply to disabled dates
        });
    }

    let date = new Date();

    let disable_dates= [
        date.setDate(date.getDate() + 1),date.setDate(date.getDate() + 2),
        date.setDate(date.getDate() + 3),date.setDate(date.getDate() + 2),
        date.setDate(date.getDate() + 3),date.setDate(date.getDate() + 2),
        date.setDate(date.getDate() + 2),date.setDate(date.getDate() + 2),
    ]

    return (

        <View style={styles.app}>

            <SafeAreaView>
                <View style={{ flexDirection: 'row' }}>
                    <Button
                        onPress={() => navigation.navigate('Content Page')}
                        title={"< My Schedule with " + name}
                    />

                </View>
                <CalendarPicker
                    onDateChange={onDateChange}
                    customDatesStyles={customDatesStyles}
                    disabledDates={disable_dates}
                />

            </SafeAreaView>
        </View>
    )

}

export default Schedule
