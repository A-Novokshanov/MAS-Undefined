import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//Method to change current user's password
export async function changeEmail(newInput) {

    const db = firebase.firestore();

    const currentUser = firebase.auth().currentUser;

    await currentUser.updateEmail(newInput)
}