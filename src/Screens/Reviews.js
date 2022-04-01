import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, SectionList, Button, Image } from 'react-native';
import styles from '../Style/Content_style';
import { Formik } from 'formik';

const Reviews = ({ route, navigation }) => {

    var { profile, is_trainer } = route.params;

    const [review, setreview] = React.useState([]);

    useEffect(() => {
        const fetchData = async () => {
            //TODO, GET REVIEWS FOR profile.name
            try {
                // const data = await getUserNotes();
                // setreview(data.Notes[profile.name]);
                // setreview([
                //     {
                //         clients: "Daniel Tan",
                //         rate: 5,
                //         comment: "I had a meeting with Duy last Friday, during which Duy showed me how to correctly... do some workouts. We also talked about some dietary plans that Duy believes will help me. Overall, Duy was a pleasure to work with, and I would recommend him to anyone!"
                //     },
                // ]);
                console.log(review);
            }
            catch (e) {
                console.log(e)
            }

        }

        fetchData();
    }, []);

    const Item = ({ item, nav }) => (
        <View style={styles.item_notes}>
            <Text>{item}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item item={item} />
    );

    const submitNotes = async (input_notes) => {
        try {
            if (review) {
                setreview([...review, String(input_notes)]);
            } else {
                setreview([String(input_notes)])
            }
            // await makeNewNote(name, input_notes);
        } catch (e) {
            console.log(e)
        }

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
                        title={"< My Reviews"}
                    />
                </View>
                <FlatList
                    style={{ height: 400 }}
                    data={review}
                    renderItem={renderItem}
                />
                {is_trainer ? <View></View> :
                    <Formik initialValues=
                        {{
                            title: '',
                            email: '',
                            password: '',
                            error: ''
                        }}
                        onSubmit={(values, { setFieldValue }) => submitNotes(values.input_notes).catch(error => setFieldValue('error', error.message))}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 50, marginLeft: 20 }}>

                                <UselessTextInput
                                    multiline
                                    numberOfLines={4}
                                    style={{ backgroundColor: '#E8E8E8', height: 200, width: 340, borderRadius: 20 }}
                                    onChangeText={handleChange('input_notes')}
                                    onBlur={handleBlur('input_notes')}
                                    value={values}
                                />

                                <TouchableOpacity
                                    style={styles.send}
                                    onPress={(handleSubmit)}>
                                    <Text style={styles.generic}> Save </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                }


            </SafeAreaView>
        </View>
    )

}

export default Reviews