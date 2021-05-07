import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// here I want to import the seed file

// import {seedDatabase} from '../seed';

const config = {
  apiKey: "AIzaSyDHYQ9ngl4JyjUEQl0CLZ1RWV2ya1v1mWk",
  authDomain: "instagram-project-b069a.firebaseapp.com",
  projectId: "instagram-project-b069a",
  storageBucket: "instagram-project-b069a.appspot.com",
  messagingSenderId: "961120267462",
  appId: "1:961120267462:web:ea7bc5905539be7c04fbc7"
};

const firebase = Firebase.initializeApp(config);
const {FieldValue} = Firebase.firestore;

// here is where I want to call the seed file (only once!)
// seedDatabase(firebase);

export {firebase, FieldValue};