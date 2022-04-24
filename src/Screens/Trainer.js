import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Button, Image } from 'react-native'
import styles from '../Style/Content_style'

/**
 * The screen for a trainer 
 * @route to get the paras from the props
 * @navigation navigation tool
 * @returns a trainer screen
 */
const Trainer = ({ route, navigation }) => {
    //params from the parents
    const { profile, is_trainer } = route.params;

    return (
        <View style={styles.app}>

            <SafeAreaView>
            <View style={{ flexDirection: 'row' }}>
                    <Button
                        onPress={() => navigation.navigate('Content Page', {
                            name: profile.name,
                            exp: profile.exp,
                            review: profile.review,
                            miles: profile.miles,
                            notes: profile.notes
                        })}
                        title={"< " + profile.name}

                    />
                    {is_trainer? 
                    <TouchableOpacity
                        style={[styles.button, styles.px12, styles.py6]}
                        onPress={() => navigation.navigate('Trainer_init', {
                            profile: profile
                        })}
                    >
                    <Text > EDIT </Text>
                </TouchableOpacity> : <View></View>}
                    
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom:50 }}>
                    <View style={{ marginLeft:30, width: 200 }}>
                    <Text>
                        {profile.introduction? profile.introduction : 
                        "Comments like this are just amazing. You can write whatever you want and after that, you can check the result of this. It can have more than 3 lines"}
                            
                    </Text>
                    </View>
                    <View style={{ marginLeft:20, width: 150 }}>
                        <Image
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 10,
                            }}
                            source={require('../Icon/pic.png')}
                        />
                        <Text>
                            {profile.name}
                        </Text>
                        <Text>
                            {profile.exp}+ years exp
                        </Text>
                        <Text>
                            {profile.review? profile.review: 0} reviews
                        </Text>
                        <Text>
                        Rating: {profile.ratings? profile.ratings.average: "None"}
                        </Text>
                        <Text>
                            {profile.miles? profile.miles: 99} miles away
                        </Text>
                        <Text>
                            {profile.is_friendly? "Is": "Not"} beginner friendly
                        </Text>
                        <Text>
                            ${profile.price? profile.price: "999"} an hour
                        </Text>
                        <Text>
                            {profile.specialization? profile.specialization: "No specialization"}
                        </Text>
                    </View>
                </View>
                

                <TouchableOpacity
                    style={[styles.button, styles.px12]}
                    disabled = {is_trainer}
                    onPress={() => navigation.navigate('Chat', {
                        name: profile.name, 
                        exp: profile.exp, 
                        review: profile.review, 
                        miles: profile.miles,
                        notes: profile.notes
                      })}
                >
                    <Text > CONTACT </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.px12]}
                    disabled = {is_trainer}
                    onPress={() => navigation.navigate('Schedule', {
                        name: profile.name
                      })}
                >
                    <Text > View Availability </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled = {is_trainer}
                    style={[styles.button, styles.px12]}
                    onPress={() => navigation.navigate('Reviews', {
                        profile : profile,
                        is_trianer: false
                      })}
                >
                    <Text > View Reviews </Text>
                </TouchableOpacity>
                
                {is_trainer? <Text style={styles.subtitle}>----------PREVIEW SCREEN----------</Text>: <View></View>}

            </SafeAreaView>
        </View>
    )

}

export default Trainer
