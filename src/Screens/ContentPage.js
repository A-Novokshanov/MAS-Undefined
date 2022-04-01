import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, SectionList, StatusBar, Image } from 'react-native';
import styles from '../Style/Content_style';
import moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker';
import Profile from './Profile';


//TODO: DATA
const DATA = [
    {
        item: "Main dishes",
        data: [
            {
                name: "John Doe",
                type: "trainer",
                exp: "4",
                review: "5.0",
                miles: "0.5"
                
            },
            {
                name: "Cool Boy",
                exp: "4",
                type: "trainer",
                review: "4.8",
                miles: "1.5"
                
            },
            {
                name: "Damn Daniel",
                exp: "9",
                type: "trainer",
                review: "4.9",
                miles: "3.5"
            }
        ]
    }
];


const Item = ({ item, nav }) => (
    <View>
        <TouchableOpacity
            style={styles.list_button}
            onPress={() => nav.navigate('Trainer', {
                profile : item
            })}
        >
            <Image
                style={styles.tinyLogo}
                source={require('../Icon/pic.png')}
            />
            <Text>{item.name}</Text>
            <Text>{item.exp}+ years exp</Text>
            <Text>Rating: {item.review}</Text>
            <Text>{item.miles} miles away</Text>
        </TouchableOpacity>
    </View>
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

let disable_dates= [
    date.setDate(date.getDate() + 1),date.setDate(date.getDate() + 2),
    date.setDate(date.getDate() + 3),date.setDate(date.getDate() + 2),
    date.setDate(date.getDate() + 3),date.setDate(date.getDate() + 2),
    date.setDate(date.getDate() + 2),date.setDate(date.getDate() + 2),
]

const onDateChange = () => (
    console.log('coool')
);



const ContentPage = ({ navigation, route }) => {

    const [direction, setDirection] = useState("My Trainers");

    var page;

    if (direction === "My Trainers") {
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
                <Profile 
                    name = {"User"}
                    is_trainer = {route.params.profile.is_trainer? route.params.profile.is_trainer : false}
                    profile = {route.params.profile}
                    navigation = {navigation}
                />
            </View>
    }


    return (
        <SafeAreaView style={styles.container}>
            <PreviewLayout
                selectedValue={direction}
                values={["My Trainers", "My Schedule",  "My Profile"]}
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



export default ContentPage