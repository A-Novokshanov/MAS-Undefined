import React, {useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView, Button } from 'react-native'
import styles from '../Style/Content_style'
import { Formik } from 'formik'
import {getUserNotes, makeNewNote} from '../Services/notesService.js'

/**
 * Shows note for the trianer use
 * @route to get the paras from the props
 * @navigation navigation tool
 * @returns chat screen
 */
const Notes = ({ route, navigation }) => {
    //params pass by the parents
    var { name, exp, review, miles } = route.params;
    //note state controller
    const [ note, setnotes ] = React.useState([]);
    //fetch the note from the firebase
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserNotes();
                setnotes(data.Notes[name]);
            }
            catch(e) {
                console.log(e)
            }
            
        }

        fetchData();
      }, []);
    //components for note sectionlist
    const Item = ({ item, nav }) => (
        <View style={styles.item_notes}>
            <Text>{item}</Text>
        </View>
    );
    //components for note sectionlist
    const renderItem = ({ item }) => (
        <Item item={item} />
    );
    //the submit handler for the notes, push the new notes to the firebase
    const submitNotes = async (input_notes) => {
        try {
            if (note) {
                setnotes([...note, String(input_notes)]);
            } else {
                setnotes([String(input_notes)])
            }
            await makeNewNote(name, input_notes);            
        }catch (e) {
            console.log(e)
        }
        
    }
    //text input for the notes
    const UselessTextInput = (props) => {
        return (
          <TextInput
            {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
            editable
            maxLength={40}
          />
        );
      }

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
                            notes: note
                        })}
                        title={"< " + name + "'s Notes"}
                    />
                </View>
                <FlatList
                    style={{ height: 400}}
                    data={note}
                    renderItem={renderItem}
                />
                <Formik initialValues=
                    {{
                        title: '',
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
                                style={{backgroundColor: '#E8E8E8', height: 200, width: 340, borderRadius: 20}}
                                onChangeText={handleChange('input_notes')}
                                onBlur={handleBlur('input_notes')}
                                value={values}
                            />
                            
                            <TouchableOpacity
                                style={styles.send }
                                onPress={(handleSubmit)}>
                                <Text style={styles.generic}> Save </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>

            </SafeAreaView>
        </View>
    )

}

export default Notes