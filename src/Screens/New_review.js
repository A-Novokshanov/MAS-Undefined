import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Switch, Button, Image } from 'react-native'
import styles from '../Style/Content_style'
import { Formik } from 'formik';
import { addRating } from '../Services/ratingsService';

/**
 * The screen for create a new review 
 * @route to get the paras from the props
 * @navigation navigation tool
 * @returns new review screen
 */
const New_review = ({ route, navigation }) => {
    // the trainer's profile
    const { profile } = route.params;
    /**
     * rate state controller
     * [0,0,0,0,0] = 0
     * [1,0,0,0,0] = 1
     * [1,1,0,0,0] = 2
     * [1,1,1,0,0] = 3
     * [1,1,1,1,0] = 4
     * [1,1,1,1,1] = 5
     */
    const [rate, setrate] = React.useState([0, 0, 0, 0, 0])
    //submit handler for creating a new review
    const submitNotes = async (input_notes) => {
        try {
            //calculate the rate
            let temp_rate = 0;
            for (let i = 4; i >= 0; i--) {
                if (rate[i] == 1) {
                    temp_rate = i + 1;
                    break;
                }
            }
            //stores the comments, rate and anonymous in to the data
            let data = {
                comments : input_notes.input_notes,
                anonymous: input_notes.anonymous,
                rate :temp_rate
            };
            //firebase add the new review
            await addRating(profile.UID, data.anonymous, data.rate, data.comments)
            //navigate to the reviews
            navigation.navigate('Trainer', {
                profile: profile
            });

        } catch (e) {
            console.log(e)
        }

    }
    //comment input
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
                        title={"< Leave a Rating for " + profile.name}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text >
                        {rate[0] == 0 ?
                            <TouchableOpacity
                                onPress={() => setrate([1, 0, 0, 0, 0])}
                            >
                                <Image
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 10,
                                    }}

                                    source={require('../Icon/unrate_star.png')}
                                />
                            </TouchableOpacity> :
                            <TouchableOpacity
                                onPress={() => setrate([0, 0, 0, 0, 0])}
                            >
                                <Image
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 10,
                                    }}

                                    source={require('../Icon/rate_star.png')}
                                />
                            </TouchableOpacity>
                        }

                        {rate[1] == 0 ?
                            <TouchableOpacity
                                onPress={() => setrate([1, 1, 0, 0, 0])}
                            >
                                <Image
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 10,
                                    }}

                                    source={require('../Icon/unrate_star.png')}
                                />
                            </TouchableOpacity> :
                            <TouchableOpacity
                                onPress={() => setrate([0, 0, 0, 0, 0])}
                            >
                                <Image
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 10,
                                    }}

                                    source={require('../Icon/rate_star.png')}
                                />
                            </TouchableOpacity>
                        }
                        {rate[2] == 0 ?
                            <TouchableOpacity
                                onPress={() => setrate([1, 1, 1, 0, 0])}
                            >
                                <Image
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 10,
                                    }}

                                    source={require('../Icon/unrate_star.png')}
                                />
                            </TouchableOpacity> :
                            <TouchableOpacity
                                onPress={() => setrate([0, 0, 0, 0, 0])}
                            >
                                <Image
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 10,
                                    }}

                                    source={require('../Icon/rate_star.png')}
                                />
                            </TouchableOpacity>
                        }

                        {rate[3] == 0 ?
                            <TouchableOpacity
                                onPress={() => setrate([1, 1, 1, 1, 0])}
                            >
                                <Image
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 10,
                                    }}

                                    source={require('../Icon/unrate_star.png')}
                                />
                            </TouchableOpacity> :
                            <TouchableOpacity
                                onPress={() => setrate([0, 0, 0, 0, 0])}
                            >
                                <Image
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 10,
                                    }}

                                    source={require('../Icon/rate_star.png')}
                                />
                            </TouchableOpacity>
                        }
                        {rate[4] == 0 ?
                            <TouchableOpacity
                                onPress={() => setrate([1, 1, 1, 1, 1])}
                            >
                                <Image
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 10,
                                    }}

                                    source={require('../Icon/unrate_star.png')}
                                />
                            </TouchableOpacity> :
                            <TouchableOpacity
                                onPress={() => setrate([0, 0, 0, 0, 0])}
                            >
                                <Image
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 10,
                                    }}

                                    source={require('../Icon/rate_star.png')}
                                />
                            </TouchableOpacity>
                        }
                    </Text>

                </View>
                <Text style={styles.subtitle}>Comments:</Text>
                <Formik initialValues=
                    {{
                        input_notes: '',
                        anonymous: false
                    }}
                    onSubmit={(values, { setFieldValue }) => submitNotes(values).catch(error => setFieldValue('error', error.message))}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 50, marginLeft: 20 }}>

                            <UselessTextInput
                                multiline
                                numberOfLines={4}
                                style={{ backgroundColor: '#E8E8E8', height: 200, width: 340, borderRadius: 20 }}
                                onChangeText={handleChange('input_notes')}
                                onBlur={handleBlur('input_notes')}
                                value={values.input_notes}
                            />
                            <Text>
                                <Switch
                                    onValueChange={value =>
                                        setFieldValue('anonymous', value)
                                    }
                                    value={values.anonymous}
                                />
                                Anonymous
                            </Text>

                            <TouchableOpacity
                                style={[styles.send, styles.px_review]}
                                onPress={(handleSubmit)}>
                                <Text style={[styles.generic]}> Submit </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>


            </SafeAreaView>
        </View>
    )

}

export default New_review
