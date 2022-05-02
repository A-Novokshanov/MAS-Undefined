import React from 'react';
import { View, SafeAreaView, Button } from 'react-native'
import styles from '../Style/Content_style'
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import Ads from './Ads';

/**
 * The screen for the schedule in the trainer's page
 * @route to get the paras from the props
 * @navigation navigation tool
 * @returns schedule screen
 */
const Schedule = ({ route, navigation }) => {
    //params from the parents
    const { name, is_trainer } = route.params;

    /**
     * Component init for CalendarPicker
     * The disabled date will be stored in the disable_dates
     * The colored date will be stored in the customDatesStyles
     */
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
    let disable_dates = [
        date.setDate(date.getDate() + 1), date.setDate(date.getDate() + 2),
        date.setDate(date.getDate() + 3), date.setDate(date.getDate() + 2),
        date.setDate(date.getDate() + 3), date.setDate(date.getDate() + 2),
        date.setDate(date.getDate() + 2), date.setDate(date.getDate() + 2),
    ]
    const onDateChange = (date) => (
        is_trainer?console.log("not trainer"):
        navigation.navigate('Payment', {
            date: date,
            name: name
        })
    );


    return (

        <View style={styles.container}>

            <SafeAreaView>
                <View style={{ flexDirection: 'row' }}>
                    <Button
                        onPress={() => is_trainer ? navigation.navigate('MyClients') : navigation.navigate('Content Page')}
                        title={"< " + name + "'s Schedule"}
                    />

                </View>
                <CalendarPicker
                    onDateChange={onDateChange}
                    customDatesStyles={customDatesStyles}
                    disabledDates={disable_dates}
                />

            </SafeAreaView>
            <Ads></Ads>
        </View>
    )

}

export default Schedule
