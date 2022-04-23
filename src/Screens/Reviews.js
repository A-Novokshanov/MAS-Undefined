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

    const { profile, is_trainer } = route.params;
    const [note, setnotes] = React.useState([]);
    var DATA = []

    const fetchData = async () => {
        try {
            const data = await viewRatings(profile.UID);
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

            setnotes(DATA);
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        fetchData();
    }, []);


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
