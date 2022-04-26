import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, SectionList, Button, Image } from 'react-native'
import styles from '../Style/Content_style'
import { Formik } from 'formik';
import { getChat, makeNewMessage, newChat } from '../Services/chatService.js';
import Ads from './Ads';


//Init chat data for the chat screen
const DATA = [
    "-Hi, how are you doing?",
  "I want to schedule a workout.",
  "oh thats cool",
  "neat"
];

/**
 * Shows the chatroom for the trainer and client
 * @route to get the paras from the props
 * @navigation navigation tool
 * @returns chat screen
 */
const Chat = ({ route, navigation }) => {
    //paras from the parents
  const { name, exp, review, miles } = route.params;
  // route.params.profile.UID is the trainer's uid
  const trainerId = route.params.profile.UID

  const [note, setnotes] = React.useState([])
  const [chatId, setChatId] = React.useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const chat_doc = await getChat(trainerId);
      console.log("the chat doc we found: ", chat_doc)
      if (chat_doc) {
        console.log("this ", chat_doc, " is boolean true")
        setnotes(chat_doc.messages)
        /* 

          msg:
 { message : hi,
   is_trainer: boolean}
*/
        console.log("id of the old chat doc ", chat_doc.id);
        setChatId(chat_doc.id)
      } else {
        const id = await newChat(trainerId);
        console.log("id of newly created chat: ", id)
        setChatId(id);
      }
    };

    fetchData();
  }, []);

    //chat data controller
    //sectionlist component
    const Item = ({ item, nav }) => (
        <View style={styles.item_notes}>
            {
                item.is_trainer ?
                    <Text>
                        <Image
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: 10,
                            }}
                            source={require('../Icon/pic.png')}
                        />
                        {item.message}
                    </Text> :
                    <Text style={{ textAlign: 'right' }}>
                        {item.message}
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
    //sectionlist components
    const renderItem = ({ item }) => (
        <Item item={item} />
    );
    //submit handler for chat
  const submitNotes = async (input_notes) => {
    setnotes([...note, input_notes])
      //TODO: DB
      console.log(input_notes)
      const new_chats = [...note, input_notes]
      console.log("new chats: ")
      console.log(new_chats)
      makeNewMessage(chatId, trainerId, String(input_notes))
    }
    //input field for chat
    const UselessTextInput = (props) => {
        return (
            <TextInput
                {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
                editable
                maxLength={40}
            />
        );
    }
    //Rendering items
    return (

        <View style={styles.container}>

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
                            <TouchableOpacity
                                style={styles.send }
                                onPress={(handleSubmit)}>
                                <Text style={styles.generic}> Send </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
                
            </SafeAreaView>
            <Ads/>
        </View>
    )

}

export default Chat
