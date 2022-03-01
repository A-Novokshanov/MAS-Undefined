import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';

//Method to make new profile
export async function makeProfile(username = "default", type = "trainer") {

    const db = firebase.firestore();
    
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;
    username = (username == "default") ? currentUser : username;

    const data = {
        Username: username,
        Email: currentUser.email,
        UID: currentUID,
        accountType: type,
    };

    await db.collection('UserProfile').doc(currentUID).set(data);

    return data;
}

//Method to get profile data
export async function getProfile(requestedUID = null) {

    const db = firebase.firestore();
    
    const currentUID = (requestedUID == null) ? currentUser.uid : requestedUID;

    const res = await db.collection('UserProfile').doc(currentUID);
    const snapshot = await res.get();

    // Profile not Found
    if (!snapshot.exists) {
        makeProfile();
        const res = await db.collection('UserProfile').doc(currentUID);
        const newData = await res.get().then((snapshot) => {
            return snapshot.data()
        })
        return newData;
    } else {
        return snapshot.data();
    }
}

//Function to edit Profile Data
export async function editProfile(dataToSet, UIDtoSet = null) {

    const db = firebase.firestore();
    
    const currentUID = (requestedUID == null) ? currentUser.uid : UIDtoSet;

    await db.collection('UserProfile').doc(currentUID).set(dataToSet);

}

//Function to delete Profile Data
export async function deleteUserData(UIDtoDelete = null) {
    const db = firebase.firestore();

    const currentUID = (requestedUID == null) ? currentUser.uid : UIDtoSet;

    await db.collection('UserProfile').doc(currentUID).delete();
}