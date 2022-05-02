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
export async function getChat(otherProfileUid) {

  // right now assume other is trainer

  const db = firebase.firestore();

  console.log("in get chat::")

  const currentUser = firebase.auth().currentUser;
  // console.log(currentUser);
  const currUid = currentUser.uid;
  // console.log(currUid)
  // console.log(otherProfileUid)

    const res = await db.collection('Chats')
  const snapshot = await res.get();

  const collection_tuples = snapshot.docs.map((doc) => {
    return {id: doc.id, data: doc.data()}
  });


  console.log("in get chat")
  console.log("client id: ", currUid, " trainer id: ", otherProfileUid)
  // console.log(collection_tuples)

  if (collection_tuples) {
    const chat_doc = collection_tuples.find((tuple) => {
      console.log('in find')
      console.log(tuple)
      return (tuple.data.client === currUid && tuple.data.trainer === otherProfileUid) || (tuple.data.client === otherProfileUid && tuple.data.trainer === currUid);
    });

    if (chat_doc) {
      console.log("in get chat: found a chat doc: chat doc")
      console.log(chat_doc)
      const data = chat_doc.data
      data.id = chat_doc.id;
      return data;
    }
  }
  return null
}

//Function to add a new message
export async function makeNewMessage(chatId, otherProfileUid, message, isTrainer) {

  const db = firebase.firestore();

  const currentUser = firebase.auth().currentUser;
  const currUid = currentUser.uid;


  const res = await db.collection('Chats')
  const snapshot = await res.get();

  const docs = snapshot.docs.map((doc) => {
    return doc.data()
  });

  console.log("-- in make new message");
  console.log(docs)
  console.log(chatId)
  console.log(message)

  const chat_doc = docs.find((doc) => {
    return (doc.client === currUid && doc.trainer === otherProfileUid) || (doc.client === otherProfileUid && doc.trainer === currUid);
  });

  console.log(chat_doc)

  console.log("chat doc in make new message")
  console.log("client id: ", currUid, " trainer id: ", otherProfileUid)
  console.log(chat_doc);
  console.log(message)


  chat_doc.messages.push({is_trainer: isTrainer, message: message});

  await db.collection('Chats').doc(chatId).set(chat_doc);

  return true;

}
