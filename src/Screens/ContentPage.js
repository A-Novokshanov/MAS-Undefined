//Front-end dependency
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, SectionList, TouchableHighlight, Image } from 'react-native';
import styles from '../Style/Content_style';
import moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker';
import Profile from './Profile';
import Slider from '@react-native-community/slider';
import SelectDropdown from 'react-native-select-dropdown';
import BouncyCheckbox from "react-native-bouncy-checkbox";
//Backend dependency
import { searchProfiles } from '../Services/searchService.js'
import { getProfile } from '../Services/profileService.js'
//Ads dependency
import {AdMobBanner} from "expo-ads-admob";


//Specialization const data
const Specialization_list = ["General", "Yoga", "Weight-Lifting"]

/**
 * Component for the SectionList.
 * @item the profile you clicked
 * @nav navigation function
 * @return navigate to the Trainer
*/
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
            <Text>Rating: {Math.round(item.ratings.average * 100) / 100}</Text>
            <Text>{item.miles} miles away</Text>
        </TouchableOpacity>
    </View>
);

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
 * ContentPage contains the main screen for the clients app, 
 * the function includes:
 * (Client)nav bar on the top of the screen,
 * (Client)Address and specialization Filter
 * (Client)SectionList for all the registered tainer
 * @navigation pass by the parents, navigation function
 * @route used to get the props parameters
 * @returns 
 */
const ContentPage = ({ navigation, route }) => {

    //state controller to detect whether the current user is a trainer
    const [myProfile, setMyProfile] = useState(route.params ? route.params.profile : { is_trainer: false });
    //state controller to init the data for the sectionlist
    const [contentData, setContentData] = useState([]);
    //state controller to track the nav tab, init with My Trainers
    const [direction, setDirection] = useState("My Trainers");
    //state controller to show the filter function, init with False
    const [show_filter, setshow_filter] = useState(false);
    //state controller to show the address function, init with False
    const [show_address, setshow_address] = useState(false);
    //state controller to track the range in the filter
    const [range_value, setRange_value] = useState(0);
    //state controller to track the price in the filter
    const [price_range, setprice_range] = useState(0);
    //state controller to track the specialiaztion in the filter
    const [special, setSpecial] = useState("Select a Specialization");
    //state controller to track the friendly in the filter
    const [isFriendly, setisFriendly] = useState(false);

    //Fetch data when the page is rendering
    useEffect(() => {
        const fetchData = async () => {
            try {
                //fetch data from the firebase and store it in to a wrapper
                const data = await searchProfiles(price_range, special, isFriendly, null);
                const wrapper = [
                    {
                        // item: "Main dishes",
                        data: data
                    }
                ]
                //set the init data for SectionList
                setContentData(wrapper);
                //set current users info into myprofile, to check if the user is a trainer
                const profile_data = await getProfile();
                setMyProfile(profile_data);
            } catch (e) {
                console.log(e)
            }
        }
        fetchData();
    }, []);

    //output for date picker
    const onDateChange = (date) => (
        console.log(date)
    )
    //handle to filter's submit action
    const _onPressButton = () => {
        //TODO: UPDATE Filter
        console.log(range_value, price_range, special, isFriendly)
    }

    /**
     * Rendering pages will be stored in the page and changed when the nav bar changed
     * direction = My trainer, my schedule and my profile
     */
    var page;
    if (direction === "My Trainers") {
        page =
            //filter and address
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

                {// if fliter button clicked, show the filter content
                    show_filter ?
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
                                    data={Specialization_list}
                                    onSelect={(selectedItem, index) => {
                                        //console.log(selectedItem, index);
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
                                        //console.log(isChecked);
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
                {//if address clicked, show address content
                    show_address ?
                        <View style={styles.address_page}>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput style={styles.content_but} placeholder="Enter Address" />
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
                {
                    //show all the trainer/clients
                }
                <SectionList
                    contentContainerStyle={styles.listContainer}
                    sections={contentData}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <Item item={item} nav={navigation} />}
                />

            </View>
        //if nav to my schedule, render the calenderpicker
    } else if (direction === "My Schedule") {
        page =
            <View>
                <CalendarPicker
                    onDateChange={(e) => onDateChange(e)}
                    customDatesStyles={customDatesStyles}
                    disabledDates={disable_dates}
                />
            </View>
        //check current user is a trainer or user, then render the different profile
    } else if (direction === "My Profile") {
        page =
            <View>
                <Profile
                    name={"User"}
                    is_trainer={myProfile.is_trainer ? true : false}
                    profile={myProfile}
                    navigation={navigation}
                />
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

    //Rendering UI
    return (
        <SafeAreaView style={styles.container}>
            <PreviewLayout
                selectedValue={direction}
                values={["My Trainers", "My Schedule", "My Profile"]}
                setSelectedValue={setDirection}>
                {page}

            </PreviewLayout>
            {
                //ads function
            }
            <View
                style={[
                    styles.box,
                    {
                        width: 500,
                        minWidth: 50,
                        height: 65,
                        backgroundColor: "grey"
                    },
                ]}
            >
                <AdMobBanner
                    bannerSize="fullBanner"
                    adUnitID="ca-app-pub-3940256099942544/6300978111"
                    servePersonalizedAds
                    onDidFailToReceiveAdWithError={this.bannerError} />
            </View>
        </SafeAreaView>
    )
}




export default ContentPage