import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//Method to make new client profile
export async function makeProfile(username = "default", paypal = '') {

    const db = firebase.firestore();

    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    const data = {
        username: username,
        email: currentUser.email,
        payment: paypal,
        UID: currentUID,
        is_trainer: false
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
      // console.log("trying to get a profile that does not exist")
        // await makeProfile();
        return {};

    } else {

        return snapshot.data();
    }
}

//Function to edit client's Profile Data
export async function editProfile(attribute, value) {
  const db = firebase.firestore();

    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

  const data = await getProfile();

  data[attribute] = value;

  await db.collection('UserProfile').doc(currentUID).set(data);


  const myprofnow = await db.collection('UserProfile').doc(currentUID).get()
  console.log(myprofnow.data());



    return data;

}
