import * as firebase from 'firebase';
import 'firebase/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyBVfHG54WdidjBqEuN_LxNo7R1DaS5umu8",
    authDomain: "community-alert-70b8e.firebaseapp.com",
    databaseURL: "https://community-alert-70b8e.firebaseio.com",
    projectId: "community-alert-70b8e",
    storageBucket: "community-alert-70b8e.appspot.com",
    messagingSenderId: "745532687109",
    appId: "1:745532687109:web:d445eccbaafd7d8119ed6c",
    measurementId: "G-R3HHPBF8HQ"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  // const firebaseApp = firebase.initializeApp(firebaseConfig);

  // const db = firebaseApp.firestore();
  // const auth = firebase.auth();
  // const storage = firebase.storage()
  // const provider = new firebase.auth.GoogleAuthProvider();
  

export  { firebase } ;
// export default db
