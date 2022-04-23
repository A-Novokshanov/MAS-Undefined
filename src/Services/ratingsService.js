import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//Function to view ratings of a trainer
export async function viewRatings(uid) {

    const db = firebase.firestore();

    const res = await db.collection('TrainerProfile').doc(uid);

    const snapshot = await res.get();

    const ratings_object = snapshot.get('ratings')

    temp = {}
    for (let i = 0; i < Object.keys(ratings_object).length; i++) {
      cur = Object.keys(ratings_object)[i]
      if (cur == 'average') {
        temp[cur] = ratings_object[cur]
      }
      else {
        temp2 = {}
        for (let j = 0; j < Object.keys(ratings_object[cur]).length; j++) {
          cur2 = Object.keys(ratings_object[cur])[j]
          temp2[cur2] = ratings_object[cur][cur2]
        }
        temp[cur] = temp2
      }
    }
    console.log("_____________________--------------------")

    return temp
}


//Function to add a trainer's ratings
export async function addRating(uid, anon = false, rating, review) {

    // Currently uid is a name, so when we upload data, rather than matching to a specific trainer's
    // UID, it is instead creating data for a document thats just the trainers name.
    // Make the UID the trainers UID, and it should sort itself out.

    const db = firebase.firestore();

    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;
    const res = await db.collection('UserProfile').doc(currentUID);
    const snapshot = await res.get();

    var username = 'Anonymous';
    name = snapshot.get('username')
    if (!anon && (name != 'default')) {
        username = name;
    }

    var ratings = await viewRatings(uid)

    try{
        if (!(currentUID in ratings)) {
            ratings['average'] = (ratings['average'] + rating) / (Object.keys(ratings).length)
        } else {
            ratings['average'] = (ratings['average'] * (Object.keys(ratings).length - 1) - ratings[currentUID]['rating'] + rating) / (Object.keys(ratings).length - 1)
        }
    } catch(e) {
        console.log(e)
    }

    const curDate = new Date()
    ratings[currentUID] = {name: username, rating: rating, review: review, date: curDate}

    const data = {
        ratings : ratings
    };
    
    db.collection('TrainerProfile').doc(uid).update(data);
    console.log("data")
    console.log(data)
    return data;
}