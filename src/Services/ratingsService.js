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
    console.log("Here I am")
    console.log(ratings_object.ratings)

    console.log(Object.keys(ratings_object.ratings))
    temp = {}
    for (let i = 0; i < Object.keys(ratings_object.ratings).length; i++) {
      cur = Object.keys(ratings_object.ratings)[i]
      if (cur == 'average') {
        temp[cur] = ratings_object.ratings[cur]
      }
      else {
        temp2 = {}
        for (let j = 0; j < Object.keys(ratings_object.ratings[cur]).length; j++) {
          cur2 = Object.keys(ratings_object.ratings[i])[j]
          temp2[cur2] = ratings_object.ratings[cur][cur2]
        }
        temp[cur] = temp2
      }
    }
    console.log(temp)
    console.log("_____________________--------------------")

    return temp

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

    // Currently uid is a name, so when we upload data, rather than matching to a specific trainer's
    // UID, it is instead creating data for a document thats just the trainers name.
    // Make the UID the trainers UID, and it should sort itself out.

    const db = firebase.firestore();

    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    if (!anon) {
        const res = await db.collection('UserProfile').doc(currentUID);
        const snapshot = await res.get();

        username = snapshot.get('username');
        if (username == 'default') {
          username = 'Anonymous'
        }
    } else{
        username = 'Anonymous';
    }

    var ratings = await viewRatings(uid)
    console.log("ratings")
    console.log(ratings)
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
    
    db.collection('TrainerProfile').doc(uid).update(data);
    console.log("data")
    console.log(data)
    return data;
}