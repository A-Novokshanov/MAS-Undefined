import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//Function to create a new notes item for a user
export async function newNotes() {

    const db = firebase.firestore();
    
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    const data = {
        Notes: {}
    };

    await db.collection('Notes').doc(currentUID).set(data);

    return data;

}


//Function to get User's notes
export async function getUserNotes() {

    const db = firebase.firestore();

    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;
    const res = await db.collection('Notes').doc(currentUID);
    const snapshot = await res.get();

    if (!snapshot.exists) {

        await newNotes();
        return {};
        
    } else {

        return snapshot.data();
    }
}

//Function to add a new note
export async function makeNewNote(target = "", noteText = "") {

    const db = firebase.firestore();
    const currentUID = firebase.auth().currentUser.uid //(requestedUID == null) ? currentUser.uid : requestedUID;
    var res = await db.collection('Notes').doc(currentUID);
    const contents = await res.get();
    
    var contentsD = contents.get("Notes");

    try{
        if (!(target in contentsD)) {
            
            contentsD[target] = new Array(noteText);
        } else {
            contentsD[target].push(noteText);
        }
    } catch(e) {
        console.log(e)
    }
    
    

    const data = {
        Notes: contentsD
    };
    
    db.collection('Notes').doc(currentUID).set(data);

    return data;

}

//Function to delete User note
export async function removeNote(noteID) {

    const db = firebase.firestore();
    
    const currentUID = firebase.auth().currentUser.uid //(requestedUID == null) ? currentUser.uid : requestedUID;

    var res = await db.collection('Notes').doc(currentUID);

    const contents = await res.get();

    var contentsD = contents.get("Notes");

    delete contentsD[noteID]

    const data = {
        Notes: contentsD
    };

    db.collection('Notes').doc(currentUID).set(data);

    return data;
}