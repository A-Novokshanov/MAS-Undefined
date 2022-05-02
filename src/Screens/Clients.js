import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Button, Image } from 'react-native';
import styles from '../Style/Content_style';
import Ads from './Ads';

/**
 * Only for the users who is a trainer, shows all the customer that the trainer has
 * @route to get the paras from the props
 * @navigation navigation tool
 * @returns client screen
 */

const Clients = ({ route, navigation }) => {

    const { name, notes, profile, trainerProf } = route.params;

    return (
        <View style={styles.container}>

            <SafeAreaView>
            <View style={{ flexDirection: 'row' }}>
                    <Button
                        onPress={() => navigation.navigate('MyClients', {
                            name: name,
                            profile: trainerProf
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
                        
                    </View>
                </View>
                

                <TouchableOpacity
                    style={[styles.button, styles.px12]}
                    onPress={() => navigation.navigate('Chat', {
                        name: name,
                        profile: profile,
                        is_trainer: true,
                        trainerProf: trainerProf
                      })}
                >
                    <Text > Chat </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.px12]}
                >
                    <Text onPress={() => navigation.navigate('Schedule', {
                        name: name,
                        is_trainer: true,
                        profile: trainerProf
                      })}> View Schedule </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.px12]}
                    onPress={() => navigation.navigate('Notes', {
                        name: name, 
                        notes: notes,
                        profile: trainerProf
                      })}
                >
                    <Text > Notes </Text>
                </TouchableOpacity>


            </SafeAreaView>
            <Ads></Ads>
        </View>
    )

}

export default Clients
