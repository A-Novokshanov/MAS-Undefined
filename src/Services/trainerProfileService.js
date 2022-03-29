import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//Method to make new trainer profile
export async function makeTrainerProfile(username = "default", paypal = '', howLong = '', eprice = '', beginnerF = false, spec = '', certID = -1, profileDesc = '') {

    const db = firebase.firestore();
    
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    const data = {
        Username: username,
        Email: currentUser.email,
        Payment: paypal,
        UID: currentUID,
        accountType: 'trainer',
        trainerLength: howLong,
        price: eprice,
        friendly: beginnerF,
        specialization: spec,
        description: profileDesc,
        certificate: certID,
        ratings : {average: 0}
    };

    await db.collection('TrainerProfile').doc(currentUID).set(data);

    return data;
}

//Method to get trainer's profile data
export async function getProfile() {

    const db = firebase.firestore();

    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;
    const res = await db.collection('TrainerProfile').doc(currentUID);
    const snapshot = await res.get();

    if (!snapshot.exists) {

        await makeProfile();
        return {};
        
    } else {

        return snapshot.data();
    }
}

//Function to edit trainer's Profile Data
export async function editProfile(username, paypal, howLong, eprice, beginnerF, spec, certID, profileDesc, ratingsDict) {
    
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    const data = {
        Username: username,
        Email: currentUser.email,
        Payment: paypal,
        UID: currentUID,
        accountType: 'trainer',
        trainerLength: howLong,
        price: eprice,
        friendly: beginnerF,
        specialization: spec,
        description: profileDesc,
        certificate: certID,
        ratings: ratingsDict
    };

    await db.collection('TrainerProfile').doc(currentUID).set(data);

    return data;

}