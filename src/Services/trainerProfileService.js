import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//Method to make new trainer profile
export async function makeTrainerProfile(input) {

    const db = firebase.firestore();

    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

  const data = {
    name: input.name || '',
        Username: input.username || 'default',
        Email: currentUser.email,
        Payment: input.paypal || '',
        UID: currentUID,
        accountType: 'trainer',
      trainerLength: input.howLong || '',
        price: input.eprice || '',
        friendly: input.beginnerF || false,
        specialization: input.spec || '',
        description: input.profileDesc || '',
        certificate: input.certID || -1,
      ratings : {average: 0},
      miles: input.miles || "4.2"
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


export async function viewTrainerProfiles() {

    const db = firebase.firestore();

  // const res = await db.collection('TrainerProfile').doc("NcfnczhEdhqMzYbOx4A5");
  const res = await db.collection('TrainerProfile')

  const snapshot = await res.get();



  const return_list = snapshot.docs.map((doc) => {
    return doc.data()
  })

  return return_list
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