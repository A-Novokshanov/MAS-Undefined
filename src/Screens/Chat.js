import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, SectionList, Button, Image } from 'react-native'
import styles from '../Style/Content_style'
import { Formik } from 'formik';
import { getChat, makeNewMessage, newChat } from '../Services/chatService.js';
import Ads from './Ads';
import { checkTrainer } from '../Services/uidService';


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
  const { name, exp, review, miles, is_trainer, profile, trainerProf } = route.params;
  // route.params.profile.UID is the trainer's uid
  //console.log(profile);
  const otherID = route.params.profile.UID

  const [note, setnotes] = React.useState([])
  const [chatId, setChatId] = React.useState(null)

  useEffect(() => {
    const fetchData = async () => {
      // setRefresh(false)
      const chat_doc = await getChat(otherID, is_trainer);

      // console.log("after get chat::")
      // console.log(chat_doc)
      var keys = Object.keys(chat_doc)
      // console.log(keys)
      if (keys.length > 0) {
        setChatId(keys[0])
        const chats = chat_doc[chatId].messages.map((chat_ob) => {
          if (chat_ob.is_trainer)
            return `-${chat_ob.message}`;
          return chat_ob.message
        });
        // console.log("chats array::")
        // console.log(chats)
        setnotes(chats);

        setChatId(chatId)
      } else {
        const id = await newChat(otherID);
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

              item.charAt(0) === '-' ?
                    <Text>
                        <Image
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: 10,
                            }}
                            source={require('../Icon/pic.png')}
                        />
                      {item.substring(1)}
                    </Text> :
                    <Text style={{ textAlign: 'right' }}>
                        {item}
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
    console.log("in submit notes:::::::::::::::::::::::::;")
    setnotes([...note, String(input_notes)])
    console.log(input_notes)

    await makeNewMessage(chatId, String(input_notes), is_trainer)
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
                        onPress={() => is_trainer ? navigation.navigate('MyClients', {
                          profile: trainerProf
                        }) : navigation.navigate('Content Page', {
                            profile: profile
                        })}
                        title={"< " + name}
                    />
                </View>
              <FlatList
                data={note}
                renderItem={renderItem}
                style={{ height: 400 }}
                />
              {/* { */}
              {/*   note.map((chat_obj, index) => <Item key={index} item={chat_obj} />) */}
              {/* } */}
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
