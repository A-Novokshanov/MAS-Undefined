import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, SectionList, Button, Image } from 'react-native'
import styles from '../Style/Content_style'

const ContentPage = ({ route, navigation }) => {

    const { name, exp, review, miles, notes } = route.params;

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
                            notes: notes
                        })}
                        title={"< " + name}

                    />
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom:50 }}>
                    <View style={{ marginLeft:59, width: 150 }}>
                    <Text>Comments like this are just amazing.
                    You can write whatever you want and after that, you can check the result of this.
                    It can have more than 3 lines</Text>
                    </View>
                    <View style={{ marginLeft:59, width: 100 }}>
                        <Image
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 10,
                            }}
                            source={require('../Icon/pic.png')}
                        />
                        <Text>
                            {name}
                        </Text>
                        <Text>
                            exp: {exp}
                        </Text>
                        <Text>
                            review: {review}
                        </Text>
                        <Text>
                            miles: {miles}
                        </Text>
                    </View>
                </View>
                

                <TouchableOpacity
                    style={[styles.button, styles.px12]}
                    onPress={() => navigation.navigate('Chat', {
                        name: name, 
                        exp: exp, 
                        review: review, 
                        miles: miles,
                        notes: notes
                      })}
                >
                    <Text > Chat </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.px12]}
                >
                    <Text onPress={() => navigation.navigate('Schedule', {
                        name: name
                      })}> View Schedule </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.px12]}
                    onPress={() => navigation.navigate('Notes', {
                        name: name, 
                        exp: exp, 
                        review: review, 
                        miles: miles,
                        notes: notes
                      })}
                >
                    <Text > Notes </Text>
                </TouchableOpacity>


            </SafeAreaView>
        </View>
    )

}

export default ContentPage
