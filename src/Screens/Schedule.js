import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, SectionList, Button, Image } from 'react-native'
import styles from '../Style/Content_style'
import CalendarPicker from 'react-native-calendar-picker';



const onDateChange = () => (
    console.log('cioool')
);


const Schedule = ({ route, navigation }) => {

    const { name, exp, review, miles, notes } = route.params;


    return (
        
        <View style={styles.app}>

            <SafeAreaView>
                <View style={{ flexDirection: 'row' }}>
                    <Button
                        onPress={() => navigation.navigate('Content Page')}
                        title={"< My Schedule with " + name}
                    />
                    
                </View>
                <CalendarPicker
          onDateChange={onDateChange}
        />

            </SafeAreaView>
        </View>
    )

}

export default Schedule
