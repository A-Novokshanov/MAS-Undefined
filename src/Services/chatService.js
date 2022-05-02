import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getUID } from './uidService';
import { addChat } from './profileService';

//Function to create a new chat
export async function newChat(otherProfileUid) {

  const db = firebase.firestore();

  const currentUser = firebase.auth().currentUser;
  const currUid = currentUser.uid;

  const chat_doc = {
    client: currUid,
    trainer: otherProfileUid,
    messages: []
  }


  await db.collection('Chats').doc().set(chat_doc);
  // since firestore is a pain, need to query again to get the document's id

  const res = await db.collection('Chats')
  const snapshot = await res.get();

  const collection_tuples = snapshot.docs.map((doc) => {
    return {id: doc.id, data: doc.data()}
  });


  // console.log("in get chat")
  // console.log("client id: ", currUid, " trainer id: ", otherProfileUid)
  // console.log(collection_tuples)

  if (collection_tuples) {
    const chat_doc = collection_tuples.find((tuple) => {
      // console.log('in find')
      // console.log(tuple)
      return (tuple.data.client === currUid && tuple.data.trainer === otherProfileUid) || (tuple.data.client === otherProfileUid && tuple.data.trainer === currUid);
    });

    return chat_doc ? chat_doc.id : null;

  }
  return null;
}


//Function to get a chat's messages
export async function getChat(otherProfileUid, isTrainer) {

  const db = firebase.firestore();

  const currentUser = firebase.auth().currentUser;
  const currentUID = currentUser.uid;

  var res = await db.collection('Chats');
  if (isTrainer) {
    console.log(currentUID)
    console.log(otherProfileUid)
    res = await res.where('trainer', '==', currentUID)
    res = await res.where('client', '==', otherProfileUid).get()
    var profiles = {};
    res.forEach(doc => {
      profiles[doc.id] = doc.data()
    });
    
    return profiles
  } else {
    res = await res.where('client', '==', currentUID)
    res = await res.where('trainer', '==', otherProfileUid).get()
    var profiles = {};
    res.forEach(doc => {
      profiles[doc.id] = doc.data()
    });
    
    return profiles
  }
  
}

//Function to add a new message
export async function makeNewMessage(chatId, message, isTrainer) {

  const db = firebase.firestore();
  var res = await db.collection('Chats').doc(chatId);
  var chat = await res.get();

  
  messages = chat.get('messages')
  console.log(messages)
  newMessage = {is_trainer: isTrainer, message: message}
  messages.push(newMessage);
  console.log(messages)
  const data = {
    messages: messages
  }

  await db.collection('Chats').doc(chatId).update(data);

  return true;

}
