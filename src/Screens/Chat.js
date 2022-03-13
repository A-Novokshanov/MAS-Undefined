import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, SectionList, Button, Image } from 'react-native'
import styles from '../Style/Content_style'
import { Formik } from 'formik';


//TODO: Chat DATA
const DATA = [
    "-Hi, how are you doing?",
    "I want to schedule a workout."
];

const Chat = ({ route, navigation }) => {

    const { name, exp, review, miles, notes } = route.params;

    const [note, setnotes] = React.useState(DATA)

    const Item = ({ item, nav }) => (
        <View style={styles.item_notes}>
            {
                item.charAt(0) === '-' ?
                    <Text>
                        <Image
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: 10,
                            }}
                            source={require('../Icon/pic.png')}
                        />
                        {item.slice(1)}
                    </Text> :
                    <Text style={{ textAlign: 'right' }}>
                        {item}
                        <Image
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: 10,
                            }}
                            source={require('../Icon/pic.png')}
                        />
                    </Text>
            }
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
                        onPress={() => navigation.navigate('Content Page', {
                            name: name,
                            exp: exp,
                            review: review,
                            miles: miles,
                            notes: note
                        })}
                        title={"< " + name}
                    />
                </View>
                <FlatList
                    style={{ height: 400 }}
                    data={note}
                    renderItem={renderItem}
                />
                <Formik initialValues=
                    {{
                        title: 'Login',
                        email: '',
                        password: '',
                        error: ''
                    }}
                    onSubmit={(values, { setFieldValue }) => submitNotes(values.input_notes).catch(error => setFieldValue('error', error.message))}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom:50, marginLeft: 20 }}>

                            <UselessTextInput
                                multiline
                                numberOfLines={4}
                                style={{ backgroundColor: '#E8E8E8', height: 200, width: 340, borderRadius: 20 }}
                                onChangeText={handleChange('input_notes')}
                                onBlur={handleBlur('input_notes')}
                                value={values}
                            />

                            {/* <TouchableOpacity
                                style={styles.send}
                                onPress={(handleSubmit)}>
                                <Text style={styles.generic}> Send </Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity
                                style={styles.send }
                                onPress={(handleSubmit)}>
                                <Text style={styles.generic}> Send </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>

            </SafeAreaView>
        </View>
    )

}

export default Chat
