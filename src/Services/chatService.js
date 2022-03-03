import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';
import { getUID } from './uidService';
import { addChat } from './profileService';

//Function to create a new chat
export async function newChat(person1Email, person2Email) {

    const db = firebase.firestore();
    
    temp = person1Email;
    if (person2Email < person1Email){
        person1Email = person2Email;
        person2Email = temp;
    }
    person1uid = getUID(person1Email);
    person2uid = getUID(person2Email);
    chatName = person1uid + person2uid;

    const res = await db.collection('Chats').doc(chatName);
    const snapshot = await res.get();

    if (snapshot.exists) {
        return "exists";
    }

    addChat(chatName, person1uid, person2uid);

    const data = {
        People: [person1uid, person2uid],
        Messages: []
    };

    await db.collection('Chats').doc(chatName).set(data);
}


//Function to get a chat's messages
export async function getChat(chatName) {

    const db = firebase.firestore();
    
    const res = await db.collection('Chats').doc(chatName);
    const snapshot = await res.get();
        
    var contentsD = snapshot.get("Messages");

    return contentsD;
}

//Function to add a new message
export async function makeNewMessage(chatName, message, uid = null) {

    const db = firebase.firestore();
    
    const currentUID = (uid == null) ? currentUser.uid : uid;
    const res = await db.collection('Chats').doc(chatName);
    const snapshot = await res.get();
        
    var contentsD = snapshot.get("Messages");
    newMessage = {"sender": currentUID, "message": message}
    contentsD.push(newMessage);

    const data = {
        Messages: contentsD
    };
    
    await db.collection('Chats').doc(chatName).update(data);

    return data;

}