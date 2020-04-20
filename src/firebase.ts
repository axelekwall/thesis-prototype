// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/auth';
// import 'firebase/firestore';

// Import config
import firebaseConfig from './config/firebaseConfig';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const githubProvider = new firebase.auth.GithubAuthProvider();
