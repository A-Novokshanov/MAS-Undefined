import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, SectionList, TouchableHighlight, Image } from 'react-native';
import styles from '../Style/Content_style';
import moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker';
import Profile from './Profile';
import Slider from '@react-native-community/slider';
import SelectDropdown from 'react-native-select-dropdown';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import {searchProfiles} from '../Services/searchService.js'


//TODO: DATA
const DATA = [
    {
        item: "Main dishes", // TODO: is this needed?
        data: [
            {
                name: "John Doe",
                type: "trainer",
                exp: "4",
              review: "5.0",
              ratings: {
                average: 3
              },
                miles: "0.5"

            },
            {
                name: "Cool Boy",
                exp: "4",
                type: "trainer",
              review: "4.8",
              ratings: {
                average: 3
              },
                miles: "1.5"

            },
            {
                name: "Damn Daniel",
                exp: "9",
                type: "trainer",
              review: "4.9",
              ratings: {
                average: 3
              },
                miles: "3.5"
            }
        ]
    }
];

const countries = ["General", "Yoga", "Weight-Lifting"]



const Item = ({ item, nav }) => (
    <View>
        <TouchableOpacity
            style={styles.list_button}
            onPress={() => nav.navigate('Trainer', {
                profile: item
            })}
        >
            <Image
                style={styles.tinyLogo}
                source={require('../Icon/pic.png')}
            />
            <Text>{item.name}</Text>
            <Text>{item.exp}+ years exp</Text>
            <Text>Rating: {item.ratings.average}</Text>
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

let disable_dates = [
    date.setDate(date.getDate() + 1), date.setDate(date.getDate() + 2),
    date.setDate(date.getDate() + 3), date.setDate(date.getDate() + 2),
    date.setDate(date.getDate() + 3), date.setDate(date.getDate() + 2),
    date.setDate(date.getDate() + 2), date.setDate(date.getDate() + 2),
]

const onDateChange = () => (
    console.log('coool')
);



const ContentPage = ({ navigation, route }) => {

  const [contentData, setContentData] = useState([]);

    const [direction, setDirection] = useState("My Trainers");

    const [show_filter, setshow_filter] = useState(false);

    const [show_address, setshow_address] = useState(false);

    const [range_value, setRange_value] = useState(0);

    const [price_range, setprice_range] = useState(0);

    const [special, setSpecial] = useState("Select a Specialization");

  const [isFriendly, setisFriendly] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await searchProfiles(price_range, special, isFriendly, null);
        console.log(data)

        const wrapper = [
          {
            item: "Main dishes",
            data: data
          }
        ]

        setContentData(wrapper);
      } catch (e) {
        console.log(e)
      }
    }

    fetchData();
  }, []);


    const _onPressButton = () => {
        //TODO: UPDATE Filter
        console.log(range_value, price_range, special, isFriendly)
    }

    var page;

    if (direction === "My Trainers") {
        page =
            <View>
                <View style={styles.fixToText}>
                    <TouchableHighlight onPress={() => setshow_filter(!show_filter)}>
                        <View style={styles.content_but}>
                            <Text style={styles.filter_text}>Filter</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => {
                        setshow_filter(false);
                        setshow_address(!show_address);
                    }} >
                        <View style={styles.content_but}>
                            <Text style={styles.filter_text}>Address</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                {show_filter ?
                    <View style={styles.filter_page} >
                        <Text style={styles.filter_text}>Within Distance - {Math.floor(range_value)} Miles</Text>
                        <Slider
                            style={{ width: 350, height: 40 }}
                            minimumValue={0}
                            maximumValue={100}
                            value={range_value}
                            onSlidingComplete={value => setRange_value(Math.floor(value))}
                        />
                        <Text style={styles.filter_text}>Within Price an hour - ${Math.floor(price_range)}</Text>
                        <Slider
                            style={{ width: 350, height: 40 }}
                            minimumValue={0}
                            maximumValue={200}
                            value={price_range}
                            onSlidingComplete={value => setprice_range(Math.floor(value))}
                        />
                        <Text style={styles.filter_text}>Specialization -
                            <SelectDropdown
                                data={countries}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index);
                                    setSpecial(selectedItem)
                                }}
                                defaultButtonText={special}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem;
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item;
                                }}
                                buttonStyle={{ height: 21 }}
                                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                dropdownIconPosition={'right'}
                                dropdownStyle={styles.dropdown1DropdownStyle}
                                rowStyle={styles.dropdown1RowStyle}
                                rowTextStyle={styles.dropdown1RowTxtStyle}

                            />
                        </Text>

                        <Text style={styles.filter_text}>Beginner Friendly-
                            <BouncyCheckbox
                                onPress={(isChecked) => {
                                    console.log(isChecked);
                                    setisFriendly(isChecked);
                                }}
                                textStyle={{
                                    height: 20,
                                    textDecorationLine: "none",
                                }}
                                text="Yes"
                                onchan
                            />
                        </Text>
                        <TouchableHighlight onPress={_onPressButton}>
                            <View style={styles.content_but}>
                                <Text style={styles.filter_text}>Submit</Text>
                            </View>
                        </TouchableHighlight>

                    </View>

                    :
                    <View></View>
                }
                {show_address ?
                <View style={styles.address_page}>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput style={styles.content_but} placeholder="Enter Address"  />
                        <TouchableHighlight onPress={console.log("address")}>
                            <View style={styles.send}>
                                <Text>Search</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    </View>
                    :
                    <View></View>
                }
                <SectionList
                    contentContainerStyle={styles.listContainer}
                    sections={contentData}
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
                    name={"User"}
                    is_trainer={route.params.profile.is_trainer ? route.params.profile.is_trainer : false}
                    profile={route.params.profile}
                    navigation={navigation}
                />
            </View>
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


    return (
        <SafeAreaView style={styles.container}>
            <PreviewLayout
                selectedValue={direction}
                values={["My Trainers", "My Schedule", "My Profile"]}
                setSelectedValue={setDirection}>
                {page}
            </PreviewLayout>
        </SafeAreaView>
    )
}




export default ContentPage