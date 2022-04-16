import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, SectionList, Button, Image } from 'react-native'
import styles from '../Style/Content_style'
import { Formik } from 'formik';
import Stars from './Stars';
import { viewRatings, addRating } from '../Services/ratingsService.js'
import {newNotes, getUserNotes, makeNewNote, removeNote} from '../Services/notesService.js'



//TODO: Reviews DATA
var DATA = [
    {
        clients: "Daniel Tan",
        date: "03/25",
        rate: 5,
        comment: "I had a meeting with him last Friday, during which he showed me how to correctly... do some workouts. We also talked about some dietary plans that he believes will help me. Overall, he was a pleasure to work with, and I would recommend him to anyone!"
    },
];

const Reviews = ({ route, navigation }) => {

  const { profile, is_trainer } = route.params;


  const [note, setnotes] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await viewRatings(profile.name);
        setnotes(data);
      } catch (e) {

        console.log(e)
      }
    }

    fetchData();
  }, []);



    route.params.temp_data? DATA.push({
        clients: route.params.temp_data.anonymous? "Anonymous User" : "User name",
        date: (new Date().toLocaleString().split(',')[0]).toString(),
        rate: route.params.temp_data.rate,
        comment: route.params.temp_data.comments
    }) : DATA = DATA;



    const Item = ({ item, nav }) => (

        <View style={styles.item_notes}>

            <Text>
                {item.clients}
            </Text>
            <Text>
                {item.date}
            </Text>
            <Text style={{ marginTop: 10 }}>
                <Stars rate={item.rate} />
            </Text>
            <Text>
                {item.comment}
            </Text>

        </View>
    );

    const renderItem = ({ item }) => (
        <Item item={item} />
    );

    const submitNotes = async (input_notes) => {
        //TODO: DB
        setnotes([...note, String(input_notes)])
    }

    const UselessTextInput = (props) => {
        return (
            <TextInput
                {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
                editable
                maxLength={40}
            />
        );
    }

    return (

        <View style={styles.app}>

            <SafeAreaView>
                <View style={{ flexDirection: 'row' }}>
                    <Button
                        onPress={() => navigation.goBack()}
                        title={"< Reviews for " + profile.name}
                    />
                </View>
                <FlatList
                    style={{ height: 600 }}
                    data={note}
                    renderItem={renderItem}
                />
                {is_trainer || route.params.temp_data ? <View></View> :
                    <TouchableOpacity 
                        style={[styles.review_button]}
                        onPress={() => navigation.navigate("New_Review", {profile: profile})}
                    >
                        <Text style={styles.generic}> Create New Review </Text>
                    </TouchableOpacity>
                }

            </SafeAreaView>
        </View>
    )

}

export default Reviews
