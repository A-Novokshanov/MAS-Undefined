import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Button, TouchableHighlight, Image } from 'react-native';

import styles from '../Style/Content_style';
import styles2 from '../Style/Styles.styles';

import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';


const onDateChange = (date) => (
    console.log(date)
);


const Payment = ({ route, navigation }) => {

    const { name, date } = route.params;

    const [selected_date, setSelected_date] = useState();

    return (

        <View style={styles.app}>

            <SafeAreaView>
                <View style={{ flexDirection: 'row' }}>
                    <Button
                        onPress={() => navigation.navigate('Content Page')}
                        title={"< Confirm your Payment"}
                    />

                </View>
                <View style={styles.fixToText}>
                    <TouchableHighlight onPress={() => console.log()}>
                        <View style={styles.content_but}>
                            <Text style={styles.filter_text}>
                                <Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 10,
                                    }}
                                    source={require('../Icon/date.png')}
                                />
                                {date.format("MMM Do YY").toString()}
                            </Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <View style={styles.content_but}>
                            <Text style={styles.filter_text}>
                                <Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 10,
                                    }}
                                    source={require('../Icon/user.png')}
                                />
                                {name}
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.fixToText}>
                    <TouchableHighlight onPress={() => console.log()}>
                        <View style={styles.content_but2}>
                            <Text style={styles.filter_text}>
                                <Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 10,
                                    }}
                                    source={require('../Icon/Location.png')}
                                />
                                Location
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <Text style={[styles.subtitle, styles.px8, styles.py6]}>
                    Detail
                </Text>

                <View style={styles.fixToText}>
                    <TouchableHighlight>
                        <View style={styles.content_but3}>
                            <Text style={styles.filter_text}>
                                Regular workout plan                  $150.00
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.fixToText}>
                    <TouchableHighlight>
                        <View style={styles.content_but3}>
                            <Text style={styles.filter_text}>
                                Premium workout plan                $200.00
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.fixToText}>
                    <TouchableHighlight>
                        <View style={styles.content_but3}>
                            <Text style={styles.filter_text}>
                                Subtotal                                          $150.00
                                Tax                                                   $15.00
                                Total                                                $165.00
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <Text style={[styles.subtitle, styles.px8, styles.py6]}>
                    Payment Method
                </Text>

                <View style={styles.fixToText}>
                    <TouchableHighlight onPress={() => console.log()}>
                        <View style={styles.content_but3}>
                            <Text style={styles.filter_text}>
                                <Image
                                    style={{
                                        width: 25,
                                        height: 25,
                                        borderRadius: 10,
                                    }}
                                    source={require('../Icon/paypal.png')}
                                />
                                ***k@gmail.com
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.fixToText}>
                    <TouchableHighlight onPress={() => console.log()}>
                        <View style={styles.content_but3}>
                            <Text style={styles.filter_text}>
                                <Image
                                    style={{
                                        width: 25,
                                        height: 25
                                    }}
                                    source={require('../Icon/applepay.png')}
                                />
                                ApplePay
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <TouchableOpacity style={styles2.button}>
                    <Text style={styles2.generic}> Confirm </Text>
                </TouchableOpacity>


            </SafeAreaView>
        </View>
    )

}

export default Payment
