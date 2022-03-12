import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, SectionList, StatusBar, Image } from 'react-native';
import styles from '../Style/Content_style';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

//TODO: DATA
const DATA = [
    {
        item: "",
        data: [
            {
                name: "Kyle Waldner",
                date_next_meeting: "2"
            },
            {
                name: "Duy Nguyen",
                date_next_meeting: "3"
            },
            {
                name: "Andrew Novokshanov",
                date_next_meeting: "4"
            },
        ]
    }
];


const Item = ({ item, nav }) => (
    <View>
        <TouchableOpacity
            style={styles.list_button}
            onPress={() => nav.navigate('Clients', {
                name: item.name,
                date_next_meeting: item.date_next_meeting
            })}
        >
            <Image
                style={styles.tinyLogo}
                source={require('../Icon/pic.png')}
            />
            <Text>{item.name}</Text>
            <Text>Next Meeting in {item.date_next_meeting} days</Text>
        </TouchableOpacity>
    </View>
);

const onDateChange = () => (
    console.log('cioool')
);

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



const MyClients = ({ navigation }) => {

    const [direction, setDirection] = useState("My Clients");

    var page;

    if (direction === "My Clients") {
        page =
            <View>
                <SectionList
                    contentContainerStyle={styles.listContainer}
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <Item item={item} nav={navigation} />}
                />

            </View>
    } else if (direction === "My Schedule") {
        page =
            <View>
                <CalendarPicker
                    onDateChange={onDateChange}
                    customDatesStyles={customDatesStyles}
                    disabledDates={disable_dates}
                />
            </View>
    } else if (direction === "My Profile") {
        page =
            <View>
                <Text>
                    My Profile
                </Text>
            </View>
    }




    return (
        <SafeAreaView style={styles.container}>

            <PreviewLayout
                selectedValue={direction}
                values={["My Clients", "My Schedule"]}
                setSelectedValue={setDirection}>
                {page}
            </PreviewLayout>
        </SafeAreaView>
    )
}

const PreviewLayout = ({
    label,
    children,
    values,
    selectedValue,
    setSelectedValue,
}) => (
    <View style={{ padding: 10, flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.row}>
            {values.map((value) => (
                <TouchableOpacity
                    key={value}
                    onPress={() => setSelectedValue(value)}
                    style={[
                        styles.button,
                        selectedValue === value && styles.selected,
                    ]}
                >
                    <Text
                        style={[
                            styles.buttonLabel,
                            selectedValue === value && styles.selectedLabel,
                        ]}
                    >
                        {value}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
        <View style={[styles.container, { [label]: selectedValue }]}>
            {children}
        </View>
    </View>
);



export default MyClients