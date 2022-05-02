import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//Function to add a new account
export async function checkTrainer(email) {

    const db = firebase.firestore();
    
    var res = await db.collection('TrainerProfile');
    const check = await res.where('Email', '==', email).get();

    if (check.empty) {
        return false;
    }
    return true;
}

export async function addAccount() {

    const db = firebase.firestore();
    
    var res = await db.collection('Accounts').doc("Account UIDs");
    const contents = await res.get();

    var contentsD = contents.get("UIDs");

    contentsD[currentUser.email] = currentUser.uid;

    const data = {
        Notes: contentsD
    };
    
    db.collection('Accounts').doc('Account UIDs').set(data);

    return data;
}

//Method to get UID
export async function getUID(email) {

    const db = firebase.firestore();

    const res = await db.collection('Accounts').doc('Account UIDs');
    const snapshot = await res.get();

    return snapshot[email];
}


//Function to delete User note
export async function removeAccount(email) {

    const db = firebase.firestore();
    
    const currentUID = (requestedUID == null) ? currentUser.uid : requestedUID;
    var res = await db.collection('Accounts').doc('Account UIDs');
    const contents = await res.get();

    var contentsD = contents.get("UIDs");

    delete contentsD[email]

    const data = {
        Notes: contentsD
    };
    
    db.collection('Accounts').doc('Account UIDs').set(data);

    return data;
}