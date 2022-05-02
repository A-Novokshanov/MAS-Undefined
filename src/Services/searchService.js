import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


/*

  read trainer profiles from trainer profile collection and then filter based on query parameters
  collection of documents
  profile filters - of trainers
 */

export async function searchProfiles(max_price = null, specalization = null, friendly = null, average_rating = null) {
  const db = firebase.firestore();

  const collection_name = 'TrainerProfile'

  /*
    filter on:
    price, specialization, beginner friendly, average rating

  */

  const res = await db.collection(collection_name)
  const snapshot = await res.get();
  const trainer_profile_docs = snapshot.docs.map((doc) => {
    return doc.data()
  })


  let result_docs = trainer_profile_docs;
  if (max_price && max_price !== 0) {
    // filter
    result_docs = trainer_profile_docs.filter((trainer_profile) => {
      return trainer_profile.price <= max_price;
    })
  }

  if (specalization && specalization !== "Select a Specialization") {
    result_docs = trainer_profile_docs.filter((trainer_profile) => {
      // if they can only select one specialization
      return specalization === trainer_profile.specialization;
    })
  }

  if (friendly === true) {
    result_docs = trainer_profile_docs.filter((trainer_profile) => {
      // if they can only select one specialization
      return friendly === trainer_profile.friendly;
    })
  }

  if (average_rating) {
    result_docs = trainer_profile_docs.filter((trainer_profile) => {
      // if they can only select one specialization
      return average_rating >= trainer_profile.ratings.average
    })
  }

  return result_docs;
}

/*
  Find users who have messaged current trainer
 */

export async function getClients() {

  const db = firebase.firestore();

  const currentUser = firebase.auth().currentUser;
  const currentUID = currentUser.uid;
    
  var res = await db.collection('Chats');
  const check = await res.where('trainer', '==', currentUID).get();

  var list = []
  check.forEach(doc => {
    list.push(doc.data()['client'])
  });
  var res2 = await db.collection('UserProfile')
  const snapshot =  await res2.where('UID', 'in', list).get();
  //var profiles = {};
  // snapshot.forEach(doc => {
  //   profiles[doc.id] = doc.data()
  // });
  var profiles = [];
  snapshot.forEach(doc => {
    profiles.push(doc.data())
  });

  return profiles
}