import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView, Button } from 'react-native'
import styles from '../Style/Content_style'
import Stars from './Stars';
import { viewRatings } from '../Services/ratingsService.js'

/**
 * Shows note for the trianer use
 * @route to get the paras from the props
 * @navigation navigation tool
 * @returns chat screen
 */
const Reviews = ({ route, navigation }) => {
    //params from parents
    const { profile, is_trainer } = route.params;
    //state controller for reviews
    const [reviews, setReviews] = React.useState([]);
    //fetch reviews from firebase
    const fetchData = async () => {
        try {
            //stores the re-formatted data
            var DATA = []
            //fetch reviews from firebase
            const data = await viewRatings(profile.UID);
            //re-format the firebase data into DATA
            for (const e in data) {
                if (e === "average") {
                    continue
                }
                DATA.push({
                    clients: data[e].name,
                    date: "04/23",
                    rate: data[e].rating,
                    comment: data[e].review
                })
            }
            //update the state
            setReviews(DATA);
        } catch (e) {
            console.log(e)
        }
    }
    //fetch when rendering
    useEffect(() => {
        fetchData();
    }, []);

    //FlatList components
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
    //FlatList components
    const renderItem = ({ item }) => (
        <Item item={item} />
    );

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
                    data={reviews}
                    renderItem={renderItem}
                />
                {//disable trainer to leave reviews
                is_trainer || route.params.temp_data ? <View></View> :
                    <TouchableOpacity
                        style={[styles.review_button]}
                        onPress={() => navigation.navigate("New_Review", { profile: profile })}
                    >
                        <Text style={styles.generic}> Create New Review </Text>
                    </TouchableOpacity>
                }

            </SafeAreaView>
        </View>
    )

}

export default Reviews
