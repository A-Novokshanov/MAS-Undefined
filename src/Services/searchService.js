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
    price, specialization, begginer friendly, average rating

  */

  const res = await db.collection(collection_name)
  const snapshot = await res.get();
  const trainer_profile_docs = snapshot.docs.map((doc) => {
    return doc.data()
  })

  console.log(trainer_profile_docs)
  console.log("original docs")


  let result_docs = trainer_profile_docs;
  console.log(max_price)
  console.log("max price &&&")
  if (max_price && max_price !== 0) {
    console.log("filter max price")
    // filter
    result_docs = trainer_profile_docs.filter((trainer_profile) => {
      return trainer_profile.price <= max_price;
    })
  }

  if (specalization && specalization !== "Select a Specialization") {
    console.log("filter specalization")
    result_docs = trainer_profile_docs.filter((trainer_profile) => {
      // if they can only select one specialization
      return specalization === trainer_profile.specialization;
    })
  }

  if (friendly === true) {
    console.log("filter friendly")
    result_docs = trainer_profile_docs.filter((trainer_profile) => {
      // if they can only select one specialization
      return friendly === trainer_profile.friendly;
    })
  }

  if (average_rating) {
    console.log("filter average rating")
    result_docs = trainer_profile_docs.filter((trainer_profile) => {
      // if they can only select one specialization
      return average_rating >= trainer_profile.ratings.average
    })
  }

  return result_docs;
}
