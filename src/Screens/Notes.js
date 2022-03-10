import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, SectionList, Button, Image } from 'react-native'
import styles from '../Style/Content_style'
import { Formik } from 'formik'
import {newNotes, getUserNotes, makeNewNote, removeNote} from '../Services/notesService.js'


const Notes = ({ route, navigation }) => {

    var { name, exp, review, miles, notes } = route.params;

    const [ note, setnotes ] = React.useState(notes);

    const setNotes = (newNote) => {
        notes = newNote;
    }

    useEffect(() => {
        const fetchData = async () => {

            try {
                const data = await getUserNotes();
                setNotes(data[name]);
            }
            catch(e) {
                console.log(e)
            }
            
        }

        fetchData();
      }, []);

    const Item = ({ item, nav }) => (
        <View style={styles.item_notes}>
            <Text>{item}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item item={item} />
    );

    const submitNotes = async (input_notes) => {
        //TODO: DB
        console.log("test")
        note = await makeNewNote(name, input_notes);
        console.log("test2")
        setnotes([...note, String(input_notes)]);
        return note;
    }
    
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
                        title={"< My Notes for " + name}
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
                                <Text style={styles.buttonlabel}> Save </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>

            </SafeAreaView>
        </View>
    )

}

export default Notes

// import React from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, SectionList, Button, Image } from 'react-native'
// import styles from '../Style/Content_style'
// import { Formik } from 'formik'
// import {newNotes, getUserNotes, makeNewNote, removeNote} from '../Services/notesService.js'
// import { render } from 'react-dom';


// export default class Notes extends React.Component {

//     state = { 
//         name: this.props.route.params.name, 
//         exp: this.props.route.params.exp, 
//         review: this.props.route.params.review, 
//         miles: this.props.route.params.miles, 
//         notes: this.props.route.params.notes 
//     };

//     async componentWillMount = () => {
//         notes = await getUserNotes()
//     }

//     const Item = ({ item, nav }) => (
//         <View style={styles.item_notes}>
//             <Text>{item}</Text>
//         </View>
//     );

//     const renderItem = ({ item }) => (
//         <Item item={item} />
//     );

//     const submitNotes = async (input_notes) => {
//         //TODO: DB
//         note = await makeNewNote(name, input_notes);
//         setnotes([...note, String(input_notes)]);
//         return note;
//     }
    
//     const UselessTextInput = (props) => {
//         return (
//           <TextInput
//             {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
//             editable
//             maxLength={40}
//           />
//         );
//     }

//     render() {
//         return (
            
//             <View style={styles.app}>

//                 <SafeAreaView>
//                     <View style={{ flexDirection: 'row' }}>
//                         <Button
//                             onPress={() => navigation.navigate('Content Page', {
//                                 name: name,
//                                 exp: exp,
//                                 review: review,
//                                 miles: miles,
//                                 notes: note
//                             })}
//                             title={"< My Notes for " + name}
//                         />
//                     </View>
//                     <FlatList
//                         style={{ height: 400}}
//                         data={note}
//                         renderItem={renderItem}
//                     />
//                     <Formik initialValues=
//                         {{
//                             title: '',
//                             email: '',
//                             password: '',
//                             error: ''
//                         }}
//                         onSubmit={(values, { setFieldValue }) => submitNotes(values.input_notes).catch(error => setFieldValue('error', error.message))}
//                     >
//                         {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
//                             <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom:50, marginLeft: 20 }}>
                                
//                                 <UselessTextInput
//                                     multiline
//                                     numberOfLines={4}
//                                     style={{backgroundColor: '#E8E8E8', height: 200, width: 340, borderRadius: 20}}
//                                     onChangeText={handleChange('input_notes')}
//                                     onBlur={handleBlur('input_notes')}
//                                     value={values}
//                                 />
                                
//                                 <TouchableOpacity
//                                     style={styles.send }
//                                     onPress={(handleSubmit)}>
//                                     <Text style={styles.buttonlabel}> Save </Text>
//                                 </TouchableOpacity>
//                             </View>
//                         )}
//                     </Formik>

//                 </SafeAreaView>
//             </View>
//         )
//     }
// }