import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, SectionList, Button, Image } from 'react-native'
import styles from '../Style/Content_style'

const Clients = ({ route, navigation }) => {

    const { name, date_next_meeting, notes } = route.params;

    return (
        <View style={styles.app}>

            <SafeAreaView>
            <View style={{ flexDirection: 'row' }}>
                    <Button
                        onPress={() => navigation.navigate('Content Page', {
                            name: name
                        })}
                        title={"< " + name}

                    />
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom:50 }}>
                    <View style={{ marginLeft:59, width: 150 }}>
                    <Text>I am super strong and wants weight lifting</Text>
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
                            Meet in {date_next_meeting} days
                        </Text>
                        
                    </View>
                </View>
                

                <TouchableOpacity
                    style={[styles.button, styles.px12]}
                    onPress={() => navigation.navigate('Chat', {
                        name: name
                      })}
                >
                    <Text > Chat </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.px12]}
                    onPress={() => navigation.navigate('Notes', {
                        name: name, 
                        notes: notes
                      })}
                >
                    <Text > Notes </Text>
                </TouchableOpacity>


            </SafeAreaView>
        </View>
    )

}

export default Clients
