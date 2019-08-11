import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyCnZBXLRoHNjxi_4BUHrm5fWXFOa3RwIXo",
    authDomain: "laboratorios-webapp.firebaseapp.com",
    databaseURL: "https://laboratorios-webapp.firebaseio.com",
    projectId: "laboratorios-webapp",
    storageBucket: "laboratorios-webapp.appspot.com",
    messagingSenderId: "674912929887",
    appId: "1:674912929887:web:2b673c3e4269846e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;