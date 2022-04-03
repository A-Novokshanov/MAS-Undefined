import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//Function to view ratings of a trainer
export async function viewRatings(name) {

    const db = firebase.firestore();

  // const res = await db.collection('TrainerProfile').doc("NcfnczhEdhqMzYbOx4A5");
  const res = await db.collection('TrainerProfile')

  const snapshot = await res.get();



  const ratings_object = snapshot.docs.map((doc) => {
    return doc.data()
  }).find((doc) => {
    return doc.name === name;
  })

  console.log(ratings_object.ratings)

  const ratings_list = Object.keys(ratings_object.ratings).map((uuid) => {
    console.log(uuid)
    if (uuid === 'average') {
      return null
    }
    return ratings_object.ratings[uuid];
  }).filter((ob) => {
    return ob
  })



  console.log(ratings_list)
  console.log("_____________________--------------------")

  return ratings_list
}


//Function to add a trainer's ratings
export async function addRating(uid, anon = false, rating, review) {

    const db = firebase.firestore();

    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    if (!anon) {
        const res = await db.collection('Profile').doc(currentUID);
        const snapshot = await res.get();

        username = snapshot.get('name');
    } else{
        username = 'Anonymous';
    }
    
    var ratings = viewRatings(uid)

    try{
        if (!(currentUID in ratings)) {
            ratings['average'] = (ratings['average'] + rating) / (Object.keys(ratings).length)
        } else {
            ratings['average'] = (ratings['average'] - ratings[currentUID]['rating'] + rating) / (Object.keys(ratings).length - 1)
        }
    } catch(e) {
        console.log(e)
    }

    ratings[currentUID] = {name: username, rating: rating, review: review}

    const data = {
        ratings : ratings
    };
    
    db.collection('TrainerProfile').doc(uid).set(data);

    return data;
}