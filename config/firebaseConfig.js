import firebase from 'firebase';


var firebaseConfig = {
    apiKey: "AIzaSyCD-VDKA4QH1RVNDjml2pSohK1g6gezfhg",
    authDomain: "youngideas-48c43.firebaseapp.com",
    projectId: "youngideas-48c43",
    storageBucket: "youngideas-48c43.appspot.com",
    messagingSenderId: "452910018407",
    appId: "1:452910018407:web:9e13c28588c94b176d49c2",
    measurementId: "G-0YQ07J41MV"
  };
 

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

  export default firebase;
