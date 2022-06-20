import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import 'firebase/compat/storage';

var firebaseConfig = {
    apiKey: "AIzaSyA6VeCRWQw-gLjpoHd-Ez6kjna1mdCg9KE",
    authDomain: "chat-app-ca1eb.firebaseapp.com",
    projectId: "chat-app-ca1eb",
    storageBucket: "chat-app-ca1eb.appspot.com",
    messagingSenderId: "175533772032",
    appId: "1:175533772032:web:12bff5b7bf258c57d3f7e5"
  };
  
  // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 firebase.analytics();

 const auth = firebase.auth();
 const db = firebase.firestore();
 const storage = firebase.storage();


 export { db, auth, storage};
 export default firebase;

 