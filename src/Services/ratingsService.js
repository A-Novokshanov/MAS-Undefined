import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//Function to view ratings of a trainer
export async function viewRatings(uid) {

    const db = firebase.firestore();
    
    const res = await db.collection('TrainerProfile').doc(uid);
    const snapshot = await res.get();

    return snapshot.get(ratings);

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