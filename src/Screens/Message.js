import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import styles from '../Style/Content_style'

/**
 * Used by only trainer, shows the chatroom for the trainer and client
 * @returns chat screen
 */
const Message = ({ name }) => {

    return (
        <View style={styles.app}>

            <SafeAreaView>


                <TouchableOpacity
                    style={[styles.message_button, { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 }]}
                    onPress={() => navigation.navigate('Chat', {
                        name: name,
                    })}
                >
                    <Image
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 10,
                        }}
                        source={require('../Icon/pic.png')}
                    />

                    <Text style={styles.mag_label}>Nguyen, Duy</Text>
                    <Text>                    Hello, my name is ...</Text>

                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.message_button, { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 }]}
                    onPress={() => navigation.navigate('Chat', {
                        name: name,
                    })}
                >
                    <Image
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 10,
                        }}
                        source={require('../Icon/pic.png')}
                    />

                    <Text style={styles.mag_label}>Doe, John</Text>
                    <Text>                    Hello, my name is ...</Text>

                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.message_button, { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 }]}
                    onPress={() => navigation.navigate('Chat', {
                        name: name,
                    })}
                >
                    <Image
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 10,
                        }}
                        source={require('../Icon/pic.png')}
                    />

                    <Text style={styles.mag_label}>Waldner, Kyle</Text>
                    <Text>                    I want to schedule a workout.</Text>

                </TouchableOpacity>


            </SafeAreaView>
        </View>
    )

}

export default Message
