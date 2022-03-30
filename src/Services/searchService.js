import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


/*

  read trainer profiles from trainer profile collection and then filter based on query parameters


  collection of documents





  profile filters - of trainers


 */

export async function searchProfiles(max_price = null, specalization = null, friendly = false, average_rating = null) {
  const db = firebase.firestore();

  const collection_name = 'TrainerProfile'

  /*
    filter on:
    price, specialization, begginer friendly, average rating

  */

  const trainer_profile_docs = await db.collection(collection_name).get();


  let result_docs = trainer_profile_docs;
  if (max_price) {
    // filter
    result_docs = trainer_profile_docs.filter((trainer_profile) => {
      return trainer_profile.price <= max_price;
    })
  }

  if (specalization) {
    result_docs = trainer_profile_docs.filter((trainer_profile) => {
      // if they can only select one specialization
      return specalization === trainer_profile.specialization;
    })
  }

  if (friendly !== null) {
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
