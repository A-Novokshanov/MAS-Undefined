import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, SectionList, Image } from 'react-native';
import styles from '../Style/Content_style';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import Profile from './Profile';
import Message from './Message';
import Ads from './Ads';
import { getClients } from '../Services/searchService';

//Init data for the trainer's customer
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

//sectionlist's component
const Item = ({ item, nav, route }) => (
    <View>
        <TouchableOpacity
            style={styles.list_button}
            onPress={() => nav.navigate('Clients', {
                name: item.username,
                profile: item,
                trainerProf: route.params.profile
            })}
        >
            <Image
                style={styles.tinyLogo}
                source={require('../Icon/pic.png')}
            />
            <Text>{item.username}</Text>
        </TouchableOpacity>
    </View>
);

/**
 * Component init for CalendarPicker
 * The disabled date will be stored in the disable_dates
 * The colored date will be stored in the customDatesStyles
 */
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


/**
 * ContentPage contains the main screen for the trainers app, 
 * the function includes:
 * (Trainer)nav bar on the top of the screen,
 * (Trainer)SectionList for all the paid customer
 * @navigation pass by the parents, navigation function
 * @route used to get the props parameters
 * @returns 
 */
const MyClients = ({ navigation, route }) => {
    //state controller to track the nav tab, init with My Trainers
    const [direction, setDirection] = useState("Clients");
    //state controller to init the data for the sectionlist
    const [contentData, setContentData] = useState([]);

    //Fetch data when the page is rendering
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getClients();
                console.log('HERE!!!')
                console.log(data)
                const wrapper = [
                    {
                        data: data
                    }
                ]
                //set the init data for SectionList
                setContentData(wrapper);
            } catch (e) {
                console.log(e)
            }
        }
        fetchData();
    }, []);
    /**
     * Rendering pages will be stored in the page and changed when the nav bar changed
     * direction = My trainer, my schedule and my profile
    */
    var page;

    if (direction === "Clients") {
        page =
            <View>
                <SectionList
                    contentContainerStyle={styles.listContainer}
                    sections={contentData}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <Item item={item} nav={navigation} route={route} />}
                />

            </View>
    } else if (direction === "Schedule") {
        page =
            <View>
                <CalendarPicker
                    onDateChange={onDateChange}
                    customDatesStyles={customDatesStyles}
                    disabledDates={disable_dates}
                />
            </View>
    } else if (direction === "Profile") {
        page =
            <View>
                <Profile
                    name={route.params.profile.name ? route.params.profile.name : "User"}
                    is_trainer={route.params.profile.is_trainer ? route.params.profile.is_trainer : false}
                    profile={route.params.profile}
                    navigation={navigation}
                />
            </View>
    } else if (direction === "Message") {
        page =
            <View>
                <Message name={"User"} />
            </View>
    }

    //controller for the nav bar
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
                            styles.tab_button,
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


    return (
        <SafeAreaView style={styles.container}>

            <PreviewLayout
                selectedValue={direction}
                values={["Clients", "Schedule", "Message", "Profile"]}
                setSelectedValue={setDirection}>
                {page}
            </PreviewLayout>
            <Ads></Ads>
        </SafeAreaView>
    )
}




export default MyClients