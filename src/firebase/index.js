import firebase from 'firebase/app'
import "firebase/auth"
import 'firebase/firestore'


var firebaseConfig = {
    apiKey: "AIzaSyAgGErK4OnSRRAvt2_qSpOObpP5bNK7BjY",
    authDomain: "aria-30b58.firebaseapp.com",
    databaseURL: "https://aria-30b58.firebaseio.com",
    projectId: "aria-30b58",
    storageBucket: "aria-30b58.appspot.com",
    messagingSenderId: "976415411701",
    appId: "1:976415411701:web:6b337df81b341cb2abe4bc"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.auth()
  firebase.firestore()

  export default firebase