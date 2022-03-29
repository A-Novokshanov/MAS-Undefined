import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//Method to make new client profile
export async function makeProfile(username = "default", paypal = '') {

    const db = firebase.firestore();
    
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    const data = {
        Username: username,
        Email: currentUser.email,
        Payment: paypal,
        UID: currentUID,
        accountType: 'client'
    };

    await db.collection('UserProfile').doc(currentUID).set(data);

    return data;
}

//Method to get client's profile data
export async function getProfile(requestedUID = null) {

    const db = firebase.firestore();

    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;
    const res = await db.collection('UserProfile').doc(currentUID);
    const snapshot = await res.get();

    if (!snapshot.exists) {

        await makeProfile();
        return {};
        
    } else {

        return snapshot.data();
    }
}

//Function to edit client's Profile Data
export async function editProfile(username = "default", paypal = '') {

    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    const data = {
        Username: username,
        Email: currentUser.email,
        Payment: paypal,
        UID: currentUID,
        accountType: 'client'
    };

    await db.collection('UserProfile').doc(currentUID).set(data);

    return data;

}