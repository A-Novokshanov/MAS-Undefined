import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Button, Image } from 'react-native';
import styles from '../Style/Content_style';

/**
 * Only for the users who is a trainer, shows all the customer that the trainer has
 * @route to get the paras from the props
 * @navigation navigation tool
 * @returns client screen
 */

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
                    <Text>Hello! My name is Duy Nguyen and I have been in the fitness industry since 2018!</Text>
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
                >
                    <Text onPress={() => navigation.navigate('Schedule', {
                        name: name
                      })}> View Schedule </Text>
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
