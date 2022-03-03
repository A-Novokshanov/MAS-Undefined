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
        chats: {}
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

//Function to edit Profile Data
export async function addChat(chatName, uid1, uid2) {

    var res1 = await db.collection('UserProfile').doc(uid1);
    const contents1 = await res1.get();

    var contentsD1 = contents1.get("chats");

    temp = person1UID;
    if (person2UID < person1UID){
        person1UID = person2UID;
        person2UID = temp;
        if ((person1UID + person2UID) in contentsD1) {
            return false;
        }
    }

    contentsD1[chatName] = [uid1, uid2];

    var res2 = await db.collection('UserProfile').doc(uid2);
    const contents2 = await res2.get();

    var contentsD2 = contents2.get("chats");

    contentsD2[chatName] = [uid1, uid2]

    const data1 = {
        Notes: contentsD1
    };

    const data2 = {
        Notes: contentsD2
    };
    
    db.collection('Notes').doc(uid1).set(data1);
    db.collection('Notes').doc(uid2).set(data2);
}